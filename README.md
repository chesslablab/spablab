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
Figure 2. Evaluation after 1.d4 d5 2.c4 Nc6 3.cxd5 Qxd5 4.e3 e5 5.Nc3 Bb4 6.Bd2 Bxc3

### Examples

Initialization with the sandbox chess server:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chess } from '@chesslablab/redux-chess';

const props = {
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

Initialization with a custom [local chess server](https://github.com/chesslablab/chess-server):

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chess } from '@chesslablab/redux-chess';

const props = {
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
/events Gets the events taking place on the game.
/fen Prints the FEN string representation of the game.
/heuristicpicture Takes a balanced heuristic picture of the current game.
/history The current game's history.
/ischeck Finds out if the game is in check.
/ismate Finds out if the game is over.
/piece {"position":"string"} Gets a piece by its position on the board.
/pieces {"color":["w","b"]} Gets the pieces on the board by color.
/playfen {"fen":"string"} Plays a chess move in shortened FEN format.
/quit Quits a game.
/resign {"action":["accept"]} Allows to resign a game.
/start {"mode":["analysis","loadfen","playfriend"],"fen":"string","color":["w","b"],"min":"int"} Starts a new game.
/status The current game status.
/takeback {"action":["accept","decline","propose"]} Allows to manage a takeback.
/undomove Undoes the last move.

Listening to commands...
```

### License

The MIT License.

### Contributions

See the [contributing guidelines](https://github.com/chesslablab/redux-chess/blob/master/CONTRIBUTING.md).

Happy learning and coding! Thank you, and keep it up.
