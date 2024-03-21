FROM node:18.16.1-alpine

RUN npm install -global @angular/cli@17.0.5

WORKDIR /app/

ADD *.json ./
RUN npm install 
ADD *.js ./

COPY projects ./projects
COPY core-libs ./core-libs
COPY feature-libs ./feature-libs
COPY integration-libs ./integration-libs
COPY extra-webpack.config.js ./
ADD .env-cmdrc.demo7 ./.env-cmdrc
COPY *.sh ./
COPY  ci-scripts ./ci-scripts
COPY  lang ./lang
COPY  scripts ./scripts
COPY  tools  ./tools
#COPY  .angular  ./.angular


EXPOSE 4200

CMD ["npm", "run", "start"]
