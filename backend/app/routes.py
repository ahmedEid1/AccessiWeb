from flask import Blueprint, request, jsonify, current_app
from flask_login import login_user, logout_user, current_user, login_required
from app import db, bcrypt
from app.models import User, Image
import boto3
from botocore.client import Config

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

    minio_client = boto3.client('s3', endpoint_url=current_app.config['MINIO_URL'],
                                aws_access_key_id=current_app.config['MINIO_ACCESS_KEY'],
                                aws_secret_access_key=current_app.config['MINIO_SECRET_KEY'],
                                config=Config(signature_version='s3v4'))

    minio_client.upload_fileobj(file, current_app.config['MINIO_BUCKET'], file.filename)

    description = "TODO: Generate description"  # Placeholder for description generation logic

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
