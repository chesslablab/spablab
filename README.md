## Redux Chess

React chessboard to be connected to a [PHP Chess server](https://github.com/programarivm/chess-server).

### Install

Via npm:

    $ npm i redux-chess

### Example

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chess } from 'redux-chess';

const props = {
  host: '127.0.0.1',
  port: '8080'
};

ReactDOM.render(
  <Chess props={props} />,
  document.getElementById('redux-chess')
);
```

![Redux Chess](/resources/demo.gif)

### License

The MIT License.

### Contributions

Thank you for your interest in this exciting project!

It may appear as if being quite challenging provided it requires this [chess server](https://github.com/programarivm/chess-server) up and running. `redux-chess` is "just a chessboard" as lightweight as it can possibly be.

The chessboard just sends messages to a WebSocket server so make sure the chess server is running on localhost:

```
$ php cli/ws-server.php
Welcome to PHP Chess Server
Commands available:
/ascii Prints the ASCII representation of the game.
/castling Gets the castling status.
/captures Gets the pieces captured by both players.
/fen Prints the FEN string representation of the game.
/history The current game's history.
/ischeck Finds out if the game is in check.
/ismate Finds out if the game is over.
/piece {"position":"square"} Gets a piece by its position on the board. The "position" parameter is mandatory.
/pieces {"color":["w","b"]} Gets the pieces on the board by color. The "color" parameter is mandatory.
/play {"color":["w","b"],"pgn":"move"} Plays a chess move on the board. All parameters are mandatory.
/playfen {"from":"FEN"} Plays a chess move on the board. All parameters are mandatory.
/quit Quits a game.
/start {"mode":["analysis"],"color":["w","b"]} Starts a new game. The "color" parameter is not required in analysis mode.
/status The current game status.

Listening to commands...
```

Or send a pull request involving [no chess server](https://github.com/programarivm/redux-chess/issues/5) if you'd prefer.

The post [How to Test a Local React NPM Package With Ease](https://javascript.plainenglish.io/testing-a-local-react-npm-package-with-ease-7d0668676ddb) might be helpful to get the `redux-chess` package up and running. Also it is recommended to test it from within [programarivm/testing-redux-chess](https://github.com/programarivm/testing-redux-chess) which is a host application for testing purposes.

Would you help make this app better?

- Look at the open issues
- Send a pull request
- Drop an email at info@programarivm.com with the subject "Redux Chess"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Happy learning!

Thank you, and keep it up.
