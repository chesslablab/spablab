## React PGN Chess

![React PGN Chess](/resources/black-chess-pieces.jpg?raw=true)

Renders a chess board that emits PGN signals on every move made by players. It is specially designed to be used with [PGN Chess](https://github.com/programarivm/pgn-chess), which is a PHP chess board representation that can play games in PGN notation.

Don't worry too much if you notice that React PGN Chess ends up generating nonsensical PGN games in some instances, as the shown below.

![Figure 1](/resources/figure-01.png)

Keep in mind that this is just a GUI which does not runs the games internally; it only writes down the moves in PGN notation. I would recommend to use [PGN Chess](https://github.com/programarivm/pgn-chess) if you want a chess engine -- and it will be great if you'd leave me some comments about it. Contributions are welcome. Many thanks!

### 1. Installation

    npm install --save react-pgn-chess

### 2. Usage

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactPgnChess from 'react-pgn-chess';

ReactDOM.render(
  <Board />,
  document.getElementById('react-pgn-chess')
);
```

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
