FROM nginx:alpine

COPY dist/simple-chat-server-frontend/* /usr/share/nginx/html/

RUN echo 'server { \
              listen       80; \
              server_name  192.168.0.108; \
              location / { \
               root   /usr/share/nginx/html; \
               index  index.html; \
               try_files $uri $uri/ /index.html?$args; \
              } \
          }' > etc/nginx/conf.d/default.conf
