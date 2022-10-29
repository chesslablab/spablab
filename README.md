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
Figure 3. Heuristics of a game

![Figure 4](/src/assets/img/docs/figure-04.png)
Figure 4. Play a Friend

![Figure 5](/src/assets/img/docs/figure-05.png)
Figure 5. Play Computer

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
/heuristics Takes a balanced heuristic picture of the current game.
/heuristics_bar {"fen":"<string>","variant":"<string>"} Takes an expanded heuristic picture of the current position.
/leave {"action":["accept"]} Allows to leave a game.
/legal_sqs {"position":"<string>"} Returns the legal squares of a piece.
/online_games Returns the online games waiting to be accepted.
/play_lan {"color":"<string>","lan":"<string>"} Plays a chess move in long algebraic notation.
/randomizer {"turn":"<string>","items":"<string>"} Starts a random position.
/rematch {"action":["accept","decline","propose"]} Allows to offer a rematch.
/resign {"action":["accept"]} Allows to resign a game.
/gm Returns a computer generated response to the current position.
/restart {"hash":"<string>"} Restarts a game.
/start {"variant":["960","capablanca80","capablanca100","classical"],"mode":["analysis","gm","fen","pgn","play","stockfish"],"fen":"<string>","movetext":"<string>","color":["w","b"],"settings":"<string>"} Starts a new game.
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
