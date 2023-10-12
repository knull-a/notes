FROM node:current-alpine

WORKDIR /srv/notes

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9080

EXPOSE 9080

CMD [ "npm", "run", "dev" ]