FROM nginx:alpine

COPY dist/simple-chat-server-frontend/* /usr/share/nginx/html/

RUN echo 'server { \
              listen       80; \
              server_name  chat.server.com; \
              location / { \
               root   /usr/share/nginx/html; \
               index  index.html; \
              } \
              location /api/ { \
                proxy_pass http://backend:8080/api/; \
              } \
          }' > etc/nginx/conf.d/default.conf
