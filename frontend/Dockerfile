FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN apk add --no-cache curl
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
