## Redux Chess

React chessboard to be connected to a [chess server](https://github.com/programarivm/chess-server).

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

Would you help make this app better?

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "Redux Chess"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
