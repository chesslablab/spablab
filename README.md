## Redux Chess

Easy-to-embed chessboard connected to a [chess server](https://github.com/chesslablab/chess-server).

Ready to npm install:

```
$ npm i @chesslablab/redux-chess
```

### Demo

Check out [this demo](https://www.chesslablab.com/).

![Figure 1](/src/assets/img/docs/figure-01.png)

### Setup

Thank you for your interest in this exciting project! Redux Chess is "just a chessboard" as lightweight as it can possibly be. It requires this [chess server](https://github.com/chesslablab/chess-server) up and running as well as this [chess API](https://github.com/chesslablab/chess-api).

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
/heuristics {"movetext":"<string>"} Takes a balanced heuristic picture of the current game.
/heuristics_bar {"fen":"<string>","variant":"<string>"} Takes an expanded heuristic picture of the current position.
/leave {"action":["accept"]} Allows to leave a game.
/legal_sqs {"position":"<string>"} Returns the legal squares of a piece.
/online_games Returns the online games waiting to be accepted.
/play_lan {"color":"<string>","lan":"<string>"} Plays a chess move in long algebraic notation.
/randomizer {"turn":"<string>","items":"<string>"} Starts a random position.
/rematch {"action":["accept","decline","propose"]} Allows to offer a rematch.
/resign {"action":["accept"]} Allows to resign a game.
/restart {"hash":"<string>"} Restarts a game.
/start {"variant":["960","capablanca80","capablanca100","classical"],"mode":["analysis","gm","fen","pgn","play","stockfish"],"add":{"color":["w","b"],"fen":"<string>","movetext":"<string>","settings":"<string>","startPos":"<string>"}} Starts a new game.
/stockfish {"options":{"Skill Level":"int"},"params":{"depth":"int"}} Returns Stockfish's response to the current position.
/takeback {"action":["accept","decline","propose"]} Allows to manage a takeback.
/undo Undoes the last move.

Listening to commands...
```

Also, it sends HTTP requests to a REST API that needs to be setup as described in the [README.md](https://github.com/chesslablab/chess-api) file.

### License

The MIT License.

### Contributions

See the [contributing guidelines](https://github.com/chesslablab/redux-chess/blob/master/CONTRIBUTING.md).

Happy learning and coding! Thank you, and keep it up.
