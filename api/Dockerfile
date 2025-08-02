# Используем официальный Node.js образ
FROM node:20

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные исходные файлы
COPY . .

# Открываем порт 8090
EXPOSE 8090

# Запускаем приложение
CMD ["npm", "run", "app"]