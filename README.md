#
sudo nano /etc/hosts

127.0.0.1   agiletech-test.com

#
cd /project-director

mkcert agiletech-test.com

#
sudo nano /etc/nginx/sites-available/agiletech-test.com

server{

    listen 80;
    server_name agiletech-test.com;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {

    listen 443 ssl;
    server_name agiletech-test.com;

    ssl_certificate /home/project-director/agiletech-test.com.pem;
    ssl_certificate_key /home/project-director/agiletech-test.com-key.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://localhost:3000/;
        proxy_redirect off;
    }
}

sudo ln -s /etc/nginx/sites-available/agiletech-test.com  /etc/nginx/sites-enabled/agiletech-test.com

sudo nginx -t

sudo nginx -s reload

#
cd /project-director

docker build -t nextjs-docker .

docker run -p 3000:3000 nextjs-docker

#
On browser access domain agiletech-test.com

![](https://i.imgur.com/lF4VZa8.png)

=> Done