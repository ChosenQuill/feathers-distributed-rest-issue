FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --quiet
COPY . .
CMD ["npm", "run", "start"]