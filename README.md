## React PGN Chess

![React PGN Chess](/resources/black-chess-pieces.jpg?raw=true)

Renders a chess board that emits PGN signals on every move made by players. It is designed to be used with [PGN Chess](https://github.com/programarivm/pgn-chess), which is a PHP chess board representation that runs games internally in PGN notation.

> React PGN Chess is still on development at this moment, please patient. Contributions are welcome!

### 1. Installation

    git clone https://github.com/programarivm/react-pgn-chess.git
    cd react-pgn-chess.git
    npm install
    composer install
    docker-compose up

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

![React PGN Chess](/resources/figure-01.png?raw=true)

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

Yep, this is a client-server app which basically validates PGN chess games at this moment.

`js` is the frontend and `php` is the backend. The server is implemented in `php/chess-server.php` with the help of [Ratchet](http://socketo.me/) -- a PHP websocket library -- and [PGN Chess](https://github.com/programarivm/pgn-chess) -- a PHP chess board representation than runs the games internally in PGN notation.

The main idea behind React PGN Chess is about writing all chess logic on the server side. It can be used as a basis for playing games vs the computer, or run computationally heavy chess algorithms that would take seconds to calculate moves.

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
