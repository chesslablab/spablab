## Redux Chess

Easy-to-embed chessboard connected to a [chess server](https://github.com/chesslablab/chess-server).

Ready to npm install:

```
$ npm i @chesslablab/redux-chess
```

### Demo

Check out [this demo](https://www.chesslablab.com/).

![Figure 1](/src/assets/img/docs/figure-01.png)
Figure 1. Analysis Board > Start Position

![Figure 2](/src/assets/img/docs/figure-02.png)
Figure 2. Opening Search > ECO Code

![Figure 3](/src/assets/img/docs/figure-03.png)
Figure 3. Training > Random Tournament Game

![Figure 4](/src/assets/img/docs/figure-04.png)
Figure 4. Heuristics of a game

![Figure 5](/src/assets/img/docs/figure-05.png)
Figure 5. Play > Online

![Figure 6](/src/assets/img/docs/figure-06.png)
Figure 6. Play > Computer

![Figure 7](/src/assets/img/docs/figure-07.png)
Figure 7. Play > A friend > Create invite code

### Learn More

Thank you for your interest in this exciting project! Redux Chess is "just a chessboard" as lightweight as it can possibly be. It requires this [chess server](https://github.com/chesslablab/chess-server) up and running as well as this [chess API](https://github.com/chesslablab/chess-api).

Here is how to set up a local environment:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chess } from '@chesslablab/redux-chess';

const props = {
  api: {
    prot: 'https',
    host: 'pchess.net',
    port: '443'
  },
  server: {
    prot: 'wss',
    host: 'pchess.net',
    port: '8443'
  }
};

ReactDOM.render(
  <Chess props={props} />,
  document.getElementById('redux-chess')
);
```

Redux Chess sends messages to a WebSocket server. Make sure the WebSocket server is running on localhost as described next.

```
$ php cli/wss-server.php
Welcome to PHP Chess Server
Commands available:
/accept {"jwt":"<string>"} Accepts a request to play a game.
/draw {"action":["accept","decline","propose"]} Allows to offer a draw.
/heuristics Takes a balanced heuristic picture of the current game.
/heuristics_bar {"fen":"<string>"} Takes an expanded heuristic picture of the current position.
/leave {"action":["accept"]} Allows to leave a game.
/legal_sqs {"position":"<string>"} Returns the legal squares of a piece.
/online_games Returns the online games waiting to be accepted.
/play_fen {"fen":"<string>"} Plays a chess move in shortened FEN format.
/random_checkmate {"turn":"<string>","items":"<string>"} Starts a random checkmate position.
/random_game Starts a random game.
/rematch {"action":["accept","decline","propose"]} Allows to offer a rematch.
/resign {"action":["accept"]} Allows to resign a game.
/gm Returns a computer generated response to the current position.
/restart {"hash":"<string>"} Restarts a game.
/start {"mode":["analysis","gm","fen","pgn","play","stockfish"],"fen":"<string>","movetext":"<string>","color":["w","b"],"settings":"<string>"} Starts a new game.
/stockfish {"options":{"Skill Level":"int"},"params":{"depth":"int"}} Returns Stockfish's response to the current position.
/takeback {"action":["accept","decline","propose"]} Allows to manage a takeback.
/undo Undoes the last move.

Listening to commands...
```

Also, it sends HTTP requests to a REST API that needs to be setup along with a database as it is described in the README.md file.

### License

The MIT License.

### Contributions

See the [contributing guidelines](https://github.com/chesslablab/redux-chess/blob/master/CONTRIBUTING.md).

Happy learning and coding! Thank you, and keep it up.
