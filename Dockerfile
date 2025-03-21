FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY .env ./

COPY . .

RUN npm run build
EXPOSE 4000

CMD ["npm", "run", "start:prod"]