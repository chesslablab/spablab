## React PGN Chess

![React PGN Chess](/resources/black-chess-pieces.jpg?raw=true)

React PGN Chess is a web-based chess board working along with [PGN Chess Server](https://github.com/programarivm/pgn-chess-server) which is a PHP Ratchet WebSocket server that validates PGN moves made by players.

![React PGN Chess](/resources/demo.gif)

Install the dependencies:

    npm install

Create an .env file:

    cp .env.example .env

Finally make sure to update the `REACT_APP_PGN_CHESS_SERVER_URL` in your `.env` file to the URL of the WebSocket server as per the [server documentation](https://github.com/programarivm/pgn-chess-server#set-up-and-start-the-server).

Then, in the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### To Dos

> **Side Note**: There are a few todos. Contributions are welcome!

1. PGN Chess Server is only responding with `true` or `false` depending on whether or not a PGN move is valid, but it has to respond with `check` and `checkmate` too.

2. The GUI should be improved a little bit more (with colors or messages) accordingly.

3. Review the pawn promotion.

4. Review and update the tests.

### License

The MIT License (MIT) Jordi Bassagañas.

### Contributions

Would you help make this app better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "React PGN Chess"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
