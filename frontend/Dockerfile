FROM node:16.14-alpine

WORKDIR /app-frontend

COPY . .

RUN ["npm", "install"]

EXPOSE 5173


CMD ["npm", "run", "dev"]