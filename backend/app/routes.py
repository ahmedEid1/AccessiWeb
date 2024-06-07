import io
import tempfile
import os
from flask import Blueprint, request, jsonify, current_app, send_file
from flask_login import login_user, logout_user, current_user, login_required
from app import db, bcrypt
from app.models import User, Image
import boto3
from botocore.config import Config as BotoConfig
from .captioning import get_caption_with_beam

bp = Blueprint('main', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first() is not None:
        return jsonify({'message': 'User with this email already exists'}), 400

    if User.query.filter_by(username=username).first() is not None:
        return jsonify({'message': 'User with this username already exists'}), 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()

    if user is None or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401

    login_user(user)
    return jsonify({'message': 'Logged in successfully'}), 200


@bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200


@bp.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'message': 'No image part in the request'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'message': 'No image selected for uploading'}), 400

    # Save the file temporarily
    temp_file_path = os.path.join(tempfile.gettempdir(), file.filename)
    file.save(temp_file_path)

    minio_client = boto3.client('s3', endpoint_url=current_app.config['MINIO_URL'],
                                aws_access_key_id=current_app.config['MINIO_ACCESS_KEY'],
                                aws_secret_access_key=current_app.config['MINIO_SECRET_KEY'],
                                config=BotoConfig(signature_version='s3v4'))

    with open(temp_file_path, 'rb') as temp_file:
        minio_client.upload_fileobj(temp_file, current_app.config['MINIO_BUCKET'], file.filename)

    try:
        # Process the image for captioning
        with open(temp_file_path, 'rb') as temp_file:
            description = get_caption_with_beam(temp_file, 3)
    finally:
        os.remove(temp_file_path)

    if current_user.is_authenticated:
        image = Image(user_id=current_user.id, image_path=file.filename, description=description)
        db.session.add(image)
        db.session.commit()

    return jsonify({'message': 'Image uploaded successfully', 'description': description}), 201


@bp.route('/history', methods=['GET'])
@login_required
def get_history():
    images = Image.query.filter_by(user_id=current_user.id).all()
    image_list = [{'image_path': img.image_path, 'description': img.description, 'created_at': img.created_at} for img
                  in images]
    return jsonify(image_list), 200

@bp.route('/get-image', methods=['GET'])
@login_required
def get_image():
    image_name = request.args.get('image_name')
    if not image_name:
        return jsonify({'message': 'Image name is required'}), 400

    minio_client = boto3.client('s3', endpoint_url=current_app.config['MINIO_URL'],
                                aws_access_key_id=current_app.config['MINIO_ACCESS_KEY'],
                                aws_secret_access_key=current_app.config['MINIO_SECRET_KEY'],
                                config=BotoConfig(signature_version='s3v4'))

    bucket_name = current_app.config['MINIO_BUCKET']

    try:
        image_object = minio_client.get_object(Bucket=bucket_name, Key=image_name)
        image_data = io.BytesIO(image_object['Body'].read())
        return send_file(image_data, mimetype='image/jpeg')
    except minio_client.exceptions.NoSuchKey:
        return jsonify({'message': 'Image not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@bp.route('/profile', methods=['GET'])
@login_required
def profile():
    user = current_user
    user_data = {
        "fullname": user.username,
        "email": user.email
    }
    return jsonify(user_data)