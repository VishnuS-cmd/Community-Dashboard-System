FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install --no-audit --no-fund
COPY frontend/ .
# Use /api so that frontend talks to the same origin (handled by nginx)
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM maven:3.9-eclipse-temurin-21 AS backend-builder
WORKDIR /app
COPY backend/pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY backend/src ./src
COPY backend/config ./config
RUN mvn -q -DskipTests package

FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache nginx

WORKDIR /app
COPY --from=backend-builder /app/target/*.jar /app/app.jar
COPY --from=backend-builder /app/config /app/config
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Configure Nginx to serve the React app and proxy /api to Spring Boot
RUN mkdir -p /etc/nginx/http.d && \
    echo 'server {' > /etc/nginx/http.d/default.conf && \
    echo '  listen 80;' >> /etc/nginx/http.d/default.conf && \
    echo '  server_name _;' >> /etc/nginx/http.d/default.conf && \
    echo '  root /usr/share/nginx/html;' >> /etc/nginx/http.d/default.conf && \
    echo '  index index.html;' >> /etc/nginx/http.d/default.conf && \
    echo '  location /api/ {' >> /etc/nginx/http.d/default.conf && \
    echo '    proxy_pass http://127.0.0.1:3000/api/;' >> /etc/nginx/http.d/default.conf && \
    echo '    proxy_set_header Host $host;' >> /etc/nginx/http.d/default.conf && \
    echo '    proxy_set_header X-Real-IP $remote_addr;' >> /etc/nginx/http.d/default.conf && \
    echo '  }' >> /etc/nginx/http.d/default.conf && \
    echo '  location / {' >> /etc/nginx/http.d/default.conf && \
    echo '    try_files $uri /index.html;' >> /etc/nginx/http.d/default.conf && \
    echo '  }' >> /etc/nginx/http.d/default.conf && \
    echo '}' >> /etc/nginx/http.d/default.conf

EXPOSE 80

# Create a startup script to run both Spring Boot and Nginx
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'java -jar /app/app.jar &' >> /app/start.sh && \
    echo 'nginx -g "daemon off;"' >> /app/start.sh && \
    chmod +x /app/start.sh

CMD ["/app/start.sh"]
