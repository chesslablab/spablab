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

It may be appear as being quite challenging provided it requires this [chess server](https://github.com/programarivm/chess-server) up and running. `redux-chess` is "just a chessboard" as lightweight as it can possibly be sending messages to a WebSocket server.

Please make sure the server is running on localhost, or feel free to elaborate on a flavor involving no chess server.

The post [How to Test a Local React NPM Package With Ease](https://javascript.plainenglish.io/testing-a-local-react-npm-package-with-ease-7d0668676ddb) might be helpful to get the `redux-chess` package up and running. Also it is recommended to test it from within [programarivm/testing-redux-chess](https://github.com/programarivm/testing-redux-chess) which is a host application for testing purposes.

Would you help make this app better?

- Look at the open issues
- Send a pull request
- Drop an email at info@programarivm.com with the subject "Redux Chess"
- Leave me a comment on [Twitter](https://twitter.com/programarivm)

Thank you.
