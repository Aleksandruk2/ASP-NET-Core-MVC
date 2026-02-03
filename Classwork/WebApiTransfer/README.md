# Build Docker image in ubuntu

```

wsl --list --verbose
#Запуск Ubuntu-24.04
wsl -d Ubuntu-24.04

#Вихід (дія "назад") із mc CTRL + O
mc

ifconfig

#Клонування проєкта на сервер
git clone https://github.com/Aleksandruk2/ASP-NET-Core-MVC.git

#Перейтии за вказаним шляхом
cd Docker-OneMVCProject/Classwork/WebApiTransfe/WebApiTransfer

#Перегяд файлів які розташовані за вказаним шляхом
ls

#Перегляд існуючих images на данаий момент
docker images

#Створення image
docker build -t transfer-api .

#Перед цим залогінитись у hub.docker.com
docker login

#Створення тега
#tag - це назва репозиторія на hub.docker.com
docker tag transfer-api:latest avalentyn/transfer-api:latest

docker images

#Запушити image на hub.docker.com
docker push avalentyn/transfer-api:latest

#Видалити image
docker rmi avalentyn/transfer-api:latest
docker rmi transfer-api

#Перегляд існуючих контейнерів
docker ps -a

#Зупинити контейнер якщо він запущений
docker stop [id]

#Видалити контейнер по id
docker rm [id]

```

#Pull and run prokect ASP.NET Core with Docker Hub
```

docker images
docker pull avalentyn/transfer-api
dokcer images

docker run -d --restart=always -v /data/transfer-api/data:/app/images --name transfer-api -p 4242:8080 avalentyn/transfer-api:latest
docker ps -a

```

#Install nginx
```

sudo apt update
sudo apt install nginxdokce
systemctl status nginx

```

#Редагувати файл C:/Windows/System32/drivers/etc/hosts
```

172.31.201.235 local.panda.com

```

#Редагувати файл на сервері /etc/nginx/sites-avaliable/default
```

server {
server_name   local.panda.com *.local.panda.com;
location / {
        proxy_pass         http://localhost:4242/swagger;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}

#рестартуємо сервер
sudo systemctl restart nginx

```
