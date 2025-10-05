# Stage 1: Build Angular app
FROM node:20 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source and build
COPY . .
RUN npm run build --prod

# Stage 2: Serve app with Nginx
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=build /app/dist/todo-frontend/browser /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
