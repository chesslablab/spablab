## React PGN Chess

![React PGN Chess](/resources/black-chess-pieces.jpg?raw=true)

This is a dockerized chess web app. Renders a chess board displaying the PGN moves made by players. The moves are validated with [PGN Chess](https://github.com/programarivm/pgn-chess), which is a PHP chess board representation that runs chess games internally in PGN notation.

> **Side Note**: There are a few todos still to be finished. Contributions are welcome!

![React PGN Chess](/resources/figure-01.png?raw=true)

### 1. Installation

Make sure you've got Docker installed already, and run:

    git clone https://github.com/programarivm/react-pgn-chess.git
    cd react-pgn-chess.git
    npm install
    composer install
    docker-compose up

Don't forget to initialize the chess server:

    php chess-server.php
    New ReactPgnChess game!

Otherwise you'll get this message: "Whoops! The websocket server is not running.""

### 2. How Does It Work?

Let's have a look at the `js/index.js` file:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.js';
import './index.css';

var BoardElement = React.createElement(Board, {server: "localhost:3001"});

ReactDOM.render(
  BoardElement,
  document.getElementById('chess-board')
);
```

As you see, the `Board` assumes there is a websocket server running on `localhost:3001` listening to messages as it is shown next:

    w e4
    b e5
    w Nf3
    b Rg1

Given the examples above, the server will respond like this:

    true
    true
    true
    false

Yep, this is a client-server app which basically validates chess games in PGN notation at this moment.

`src` is the frontend and `php` is the backend.

The frontend is `src` because it was created with the help of `create-react-app`. On the other hand, `php/chess-server.php` is been implemented with the help of [Ratchet](http://socketo.me/) and [PGN Chess](https://github.com/programarivm/pgn-chess).

The main idea behind React PGN Chess is about writing all chess logic on the server side, and it can be used as a basis for playing games vs the computer, or run computationally heavy chess algorithms that would take seconds to make chess moves.

### 3. Demo

> Soon available.

### 4. To Dos

1. At this moment, `php/PgnChessGame.php` is only responding with `true` or `false`, depending on whether or not a PGN move is valid. But it must respond with `check` and `checkmate` too. The GUI needs to be improved a little bit more (with colors or messages) accordingly. This will be easy to do since the check and checkmate are calculated by PGN Chess already.

### 5. License

The MIT License (MIT) Jordi Bassagañas.

### 6. Contributions

Would you help make this library better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "React PGN Chess"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)
- Say hello on [Google+](https://plus.google.com/+Programarivm)

Thank you.
