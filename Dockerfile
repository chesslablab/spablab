FROM node:9.10
RUN mkdir -p /usr/src/react-pgn-chess
WORKDIR /usr/src/react-pgn-chess
COPY package.json /usr/src/react-pgn-chess/
RUN npm install
COPY . /usr/src/react-pgn-chess
CMD ["npm", "start"]
