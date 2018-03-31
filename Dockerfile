FROM node:9.10
RUN mkdir -p /usr/src/my-app
WORKDIR /usr/src/my-app
COPY package.json /usr/src/my-app/
RUN npm install
COPY . /usr/src/my-app
CMD ["npm", "start"]
