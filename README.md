## React PGN Chess

![React PGN Chess](/resources/black-chess-pieces.jpg?raw=true)

Renders a chess board that emits PGN signals on every move made by players. It is designed to be used with [PGN Chess](https://github.com/programarivm/pgn-chess), which is a PHP chess board representation that runs games internally in PGN notation.

> React PGN Chess is still on development at this moment, please patient. Contributions are welcome!

### 1. Installation

    npm install --save react-pgn-chess

### 2. Usage

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.js';
import './index.css';

var BoardElement = React.createElement(Board, {server: "ws://localhost:3001"});

ReactDOM.render(
  BoardElement,
  document.getElementById('chess-board')
);
```

![React PGN Chess](/resources/figure-01.png?raw=true)

React PGN Chess assumes there is a websocket server running on `localhost:3001`. The connection listens to messages as the ones described below:

    w e4
    b e5
    w Nf3
    b Rg1

Responding like this:

    true
    true
    true
    false

As you see, React PGN Chess is a GUI implemented with React that speaks to a PHP chess server through a websocket. Yep, this is a server-side app, so what about the server side?

> Have a look at [PhpChessJs](https://github.com/programarivm/php-chess-js) and see how te pieces of the puzzle fit together! Here, you'll find a simple chess server implemented with [Ratchet](http://socketo.me/), which is a PHP websocket library, and using [PGN Chess](https://github.com/programarivm/pgn-chess) as the chess board representation.

The idea behind [PhpChessJs](https://github.com/programarivm/php-chess-js) puts the focus on writing all chess logic on the server side, and can be used as a basis for implementing computationally heavy chess algorithms that can take a few seconds to calculate a move.

### 3. Demo

> Soon available.

### 4. License

The MIT License (MIT) Jordi Bassagañas.

### 5. Contributions

Would you help make this library better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "React PGN Chess"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)
- Say hello on [Google+](https://plus.google.com/+Programarivm)

Thank you.
