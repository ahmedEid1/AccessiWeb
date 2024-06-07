# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install netcat-openbsd and other dependencies
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Install the Python dependencies
RUN pip install -r requirements.txt --progress-bar on --no-cache-dir --verbose

# Copy the rest of the application code
COPY . .

# Make the entrypoint script executable
RUN chmod +x entrypoint.sh

# Set environment variables
ENV FLASK_APP=run.py

# Expose the port the app runs on
EXPOSE 5000

# Run the entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
