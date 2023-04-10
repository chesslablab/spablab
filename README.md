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

Thank you for your interest in this exciting project! Redux Chess is "just a chessboard" as lightweight as it can possibly be.

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

It requires this [chess server](https://github.com/chesslablab/chess-server) up and running as well as this [chess API](https://github.com/chesslablab/chess-api).

### License

The MIT License.

### Contributions

See the [contributing guidelines](https://github.com/chesslablab/redux-chess/blob/master/CONTRIBUTING.md).

Happy learning and coding! Thank you, and keep it up.
