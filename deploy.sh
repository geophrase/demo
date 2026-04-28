#!/bin/bash
set -e

image_tag="$1"

if [ -z "$image_tag" ]; then
    echo "Usage: ./deploy.sh [image-tag]"
    exit 1
fi

# Updated to match the target folder in your SCP step
cd /home/iqbal/demo

# Export the tag so docker compose picks it up
export IMAGE_TAG="$image_tag"

echo "Pulling Next.js image $image_tag ..."
# Assuming your file is named compose.production.yaml based on your old script
docker compose -f compose.production.yaml pull

echo "Recreating Next.js containers ..."
docker compose -f compose.production.yaml up -d

echo "Cleaning up old images ..."
docker system prune -af --volumes

echo "Successfully deployed image tag $image_tag!"