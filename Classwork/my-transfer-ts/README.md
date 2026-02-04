# React + TypeScript + Vite


#Білдимо та створюємо новий образ (front + back)
```

docker images

#Створення image
docker build -t my-transfer-app .

#Перед цим залогінитись у hub.docker.com
docker login

#Створення тега
#tag - це назва репозиторія на hub.docker.com
docker tag my-transfer-app:latest avalentyn/my-transfer-app:latest

docker images

#Запушити image на hub.docker.com
docker push avalentyn/my-transfer-app:latest

#Видалити image
docker rmi avalentyn/my-transfer-app:latest
docker rmi my-transfer-app

docker run -d --restart=always --name my-transfer-app-container -p 5234:80 avalentyn/my-transfer-app:latest
docker run -d --restart=always --name my-transfer-app-container -p 5233:80 my-transfer-app:latest          

#Додали файл .dockerignore
```