## React PHP Chess

![React PHP Chess](/resources/black-chess-pieces.jpg?raw=true)

React PHP Chess is a web-based chess board connected to a [PHP Chess Server](https://github.com/programarivm/chess-server).

![React PHP Chess](/resources/demo.gif)

Install the dependencies:

    npm install

Create an .env file:

    cp .env.example .env

Make sure to update the `REACT_APP_PHP_CHESS_SERVER_URL` in your `.env` file to the URL of the WebSocket server as per the [server documentation](https://github.com/programarivm/chess-server).

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

### License

The MIT License (MIT) Jordi Bassagañas.

### Contributions

Would you help make this app better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "React PHP Chess"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
