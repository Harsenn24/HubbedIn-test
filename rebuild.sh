
=IMAGE_NAME=birthday_api
CONTAINER_NAME=birthday_api

echo "Stopping old container..."
docker stop $CONTAINER_NAME 2>/dev/null
docker rm $CONTAINER_NAME 2>/dev/null

echo "Building new image..."
docker build -t $IMAGE_NAME .

echo "Running container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p 3000:3000 \
  -e MONGO_URL=mongodb://localhost:27017/birthday_db \
  -e PORT=3000 \
  -v $(pwd):/app \
  $IMAGE_NAME

echo "Done! Container is running."
