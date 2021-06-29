FROM harbor.dtyunxi.cn/library/frontbase:0.7.0
ENV PRO_LOCAL false

RUN echo "Asia/shanghai" > /etc/timezone;
ADD dist /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d/default.conf
ADD enterpoint.sh /usr/share/nginx/html/enterpoint.sh

RUN chmod +x /usr/share/nginx/html/enterpoint.sh
WORKDIR /usr/share/nginx/html/

ENTRYPOINT ["/usr/share/nginx/html/enterpoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
