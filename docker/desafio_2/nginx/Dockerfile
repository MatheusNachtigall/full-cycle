FROM nginx:1.15.0-alpine

#Command to remove nginx default configuration
RUN rm /etc/nginx/conf.d/default.conf 

#Copy the custom conf file to nginx container
COPY nginx.conf /etc/nginx/conf.d/

#For nginx to run we need at least an index.php (even if blank) so we dont get an 404
RUN mkdir /var/www/html -p && touch /var/www/html/index.php