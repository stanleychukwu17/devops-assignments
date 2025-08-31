#!/bin/bash

sudo apt-get update && sudo apt-get -y install httpd 
sudo systemctl start httpd && sudo systemctl enable httpd
echo "Hello from $(hostname -f), Deployed via Terraform" > /var/www/html/index.html

sudo apt-get -y install docker
sudo systemctl start docker && sudo systemctl enable docker

sudo usermod -aG docker ec2-user

sudo docker run -d --name nginx_server -p 8080:80 -v ./nginx.conf:/etc/nginx/nginx.conf nginx