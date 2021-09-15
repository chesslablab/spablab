## Redux Chess

React chessboard connected to a [PHP Chess server](https://github.com/chesslab/chess-server).

### Install

Via npm:

    $ npm i @chesslab/redux-chess

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
import { Chess } from '@chesslab/redux-chess';

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

Initialization with a custom [local chess server](https://github.com/chesslab/chess-server):

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Chess } from '@chesslab/redux-chess';

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

It may appear as if being quite challenging provided it requires this [chess server](https://github.com/chesslab/chess-server) up and running. `@chesslab/redux-chess` is "just a chessboard" as lightweight as it can possibly be.

The chessboard just sends messages to a WebSocket server so make sure the chess server is running on localhost:

```
$ php cli/ws-server.php
Welcome to PHP Chess Server
Commands available:
/accept {"id":"id"} Accepts a friend request to play a game.
/ascii Prints the ASCII representation of the game.
/castling Gets the castling status.
/captures Gets the pieces captured by both players.
/fen Prints the FEN string representation of the game.
/heuristicpicture Takes a balanced heuristic picture of the current game.
/history The current game's history.
/ischeck Finds out if the game is in check.
/ismate Finds out if the game is over.
/piece {"position":"string"} Gets a piece by its position on the board.
/pieces {"color":["w","b"]} Gets the pieces on the board by color.
/playfen {"fen":"string"} Plays a chess move in shortened FEN format.
/quit Quits a game.
/start {"mode":["analysis","loadfen","playfriend"],"fen":"string","color":["w","b"],"min":"int"} Starts a new game.
/status The current game status.

Listening to commands...
```

For further information on developing this awesome npm package, you're invited to read my learning journey:

- [Demystifying AI Through a Human-Like Chess Engine](https://medium.com/geekculture/demystifying-ai-through-a-human-like-chess-engine-5f71e3896cc9)
- [Two Things That My AI Project Required](https://medium.com/geekculture/two-things-that-my-ai-project-required-50000297053b)
- [What Are Some Healthy Tips to Reduce Cognitive Load?](https://medium.com/geekculture/what-are-some-healthy-tips-to-reduce-cognitive-load-4f91b695a3cb)
- [How to Take Normalized Heuristic Pictures](https://medium.com/geekculture/how-to-take-normalized-heuristic-pictures-79ca0df4cdec)
- [Equilibrium, Yin-Yang Chess](https://medium.com/geekculture/equilibrium-yin-yang-chess-292e044be46b)
- [Adding Classes to a SOLID Codebase Without Breaking Anything Else](https://medium.com/geekculture/adding-classes-to-a-solid-codebase-without-breaking-anything-else-99e6c5a5f3e4)
- [Preparing a Dataset for Machine Learning With PHP](https://ai.plainenglish.io/preparing-a-dataset-for-machine-learning-with-php-fd68dd85187e)
- [Converting a FEN Chess Position Into a PGN Move](https://medium.com/geekculture/converting-a-fen-chess-position-into-a-pgn-move-4a278d81b21f)
- [A React Chessboard with Redux and Hooks in Few Lines](https://medium.com/geekculture/a-react-chessboard-with-redux-and-hooks-in-few-lines-6009cb724bb)
- [How to Test a Local React NPM Package With Ease](https://javascript.plainenglish.io/testing-a-local-react-npm-package-with-ease-7d0668676ddb)
- [TDDing a React App With Jest the Easy Way](https://medium.com/geekculture/tdding-a-react-app-with-jest-the-easy-way-8ddb64aeaba6)
- [How to Test React Components With Joy](https://javascript.plainenglish.io/looking-forward-to-testing-react-components-with-joy-5bb3f86c21d7)
- [My First Integration Test in a Redux Hooked App](https://javascript.plainenglish.io/my-first-integration-test-in-a-redux-hooked-app-3b189addd46e)
- [Creating a Local WebSocket Server With TLS/SSL Is Easy as Pie](https://medium.com/geekculture/creating-a-local-websocket-server-with-tls-ssl-is-easy-as-pie-de1a2ef058e0)
- [A Simple Example of SSL/TLS WebSocket With ReactPHP and Ratchet](https://medium.com/geekculture/a-simple-example-of-ssl-tls-websocket-with-reactphp-and-ratchet-e03be973f521)
- [Newbie Tutorial on How to Rate-Limit a WebSocket Server](https://medium.com/geekculture/newbie-tutorial-on-how-to-rate-limit-a-websocket-server-8e28642ad5ff)
- [Visualizing Chess Openings Before MLP Classification](https://medium.com/geekculture/visualizing-chess-openings-before-mlp-classification-fd2a3e8c266)

### Testing Environment

In order to develop the `@chesslab/redux-chess` package locally, you may want to look at the [testing environment repo](https://github.com/chesslab/testing-redux-chess) as well.

### License

The MIT License.

### Contributions

- [How to Contribute to Chesslab](https://medium.com/geekculture/how-to-contribute-to-chesslab-cca73fefaf70)

Happy learning and coding!

Thank you, and keep it up.
