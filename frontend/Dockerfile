# Step 1: Build the app
FROM node:20 as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Step 2: Serve it with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
