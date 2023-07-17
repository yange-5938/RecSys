# Use the official Nginx base image
FROM nginx:latest

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the CRA build files to the Nginx root directory
COPY frontend/build /usr/share/nginx/html