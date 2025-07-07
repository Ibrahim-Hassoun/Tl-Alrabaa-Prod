git checkout stage
git pull origin stage
docker-compose down
docker-compose up -d

echo "✅ Deployment complete"
exit 0

