FROM node:16.14-alpine

WORKDIR /app-backend

COPY . .

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

RUN ["npm", "run", "migration"]

EXPOSE 3008

CMD ["npm", "start"]