FROM node:14.15.4-alpine

ENV NODE_ENV=production

WORKDIR /app

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

USER node

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --production

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "server.js" ]
