## Redux Chess

React chessboard connected to a [PHP Chess server](https://github.com/chesslablab/chess-server).

### Install

Via npm:

    $ npm i @chesslablab/redux-chess

### Demo

Check out [this demo](https://programarivm.github.io/demo-redux-chess).

> Please note the sandbox server may not be up and running all the time.

![Figure 1](/src/assets/img/docs/figure-01.png)
Figure 1. The Chigorin Defense to the Queen's Gambit

![Figure 2](/src/assets/img/docs/figure-02.png)
Figure 2. Heuristic picture after 1.d4 d5 2.c4 Nc6 3.cxd5 Qxd5 4.e3 e5 5.Nc3 Bb4 6.Bd2 Bxc3

### Examples

Initialization with the sandbox environment:

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

Initialization with a local environment consisting of a [Chess API](https://github.com/chesslablab/chess-api) and a [Chess Server](https://github.com/chesslablab/chess-server):

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chess } from '@chesslablab/redux-chess';

const props = {
  api: {
    prot: 'https',
    host: 'api.local',
    port: '443'
  },
  server: {
    prot: 'ws',
    host: '127.0.0.1',
    port: '8080'
  }
};

ReactDOM.render(
  <Chess props={props} />,
  document.getElementById('redux-chess')
);

```

### Learn More

Thank you for your interest in this exciting project!

It may appear as if being quite challenging provided it requires this [chess server](https://github.com/chesslablab/chess-server) up and running. `@chesslablab/redux-chess` is "just a chessboard" as lightweight as it can possibly be.

The chessboard just sends messages to a WebSocket server so make sure the chess server is running on localhost:

```
$ php cli/ws-server.php
Welcome to PHP Chess Server
Commands available:
/accept {"id":"id"} Accepts a friend request to play a game.
/ascii Prints the ASCII representation of the game.
/castling Gets the castling status.
/captures Gets the pieces captured by both players.
/draw {"action":["accept","decline","propose"]} Allows to offer a draw.
/fen Prints the FEN string representation of the game.
/heuristic_picture Takes a balanced heuristic picture of the current game.
/history The current game's history.
/is_check Finds out if the game is in check.
/is_mate Finds out if the game is over.
/piece {"position":"string"} Gets a piece by its position on the board.
/pieces {"color":["w","b"]} Gets the pieces on the board by color.
/play_fen {"fen":"string"} Plays a chess move in shortened FEN format.
/quit Quits a game.
/rematch {"action":["accept","decline","propose"]} Allows to offer a rematch.
/resign {"action":["accept"]} Allows to resign a game.
/response Returns a computer response to the current position.
/restart {"hash":"string"} Restarts a game.
/start {"mode":["analysis","grandmaster","loadfen","loadpgn","playfriend"],"fen":"string","movetext":"string","color":["w","b"],"min":"int","increment":"int"} Starts a new game.
/status The current game status.
/takeback {"action":["accept","decline","propose"]} Allows to manage a takeback.
/undo_move Undoes the last move.

Listening to commands...
```

### License

The MIT License.

### Contributions

See the [contributing guidelines](https://github.com/chesslablab/redux-chess/blob/master/CONTRIBUTING.md).

Happy learning and coding! Thank you, and keep it up.
