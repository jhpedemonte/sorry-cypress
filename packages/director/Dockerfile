FROM node:10-slim as builder
WORKDIR /app

COPY package*.json  ./
RUN npm install

COPY src ./src
COPY config ./config
COPY .babelrc ./
COPY tsconfig.json ./

RUN npm run build

# ###############################################################################
FROM node:10-slim as sorry-cypress-director
WORKDIR /app

# copy the built application from the builder
COPY --from=builder --chown=node:node /app/package*.json /app/
COPY --from=builder --chown=node:node /app/dist /app/dist

# install dependencies (production only)
RUN npm install --production

ENV NODE_ENV production
EXPOSE 1234
CMD [ "npm", "run", "start" ]