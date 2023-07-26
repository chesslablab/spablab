<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <link rel="icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#000000">
  <meta
    name="description"
    content="Chess API for web apps using GET and POST HTTP requests. WebSockets-based chess server providing additional functionality."
 >
  <link rel="apple-touch-icon" href="https://www.chesslablab.com/assets/img/abstract.jpg">
  <link rel="manifest" href="/manifest.json">
  <title>ChesslaBlab Documentation</title>
  <!-- Twitter Card data -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@programarivm">
  <meta name="twitter:title" content="ChesslaBlab Documentation">
  <meta name="twitter:description" content="Chess API for web apps using GET and POST HTTP requests. WebSockets-based chess server providing additional functionality.">
  <meta name="twitter:creator" content="@programarivm">
  <meta name="twitter:image" content="https://www.chesslablab.com/assets/img/abstract.jpg">
  <!-- Open Graph data -->
  <meta property="og:title" content="ChesslaBlab Documentation">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.chesslablab.com/">
  <meta property="og:image" content="https://www.chesslablab.com/assets/img/abstract.jpg">
  <meta property="og:description" content="Chess API for web apps using GET and POST HTTP requests. WebSockets-based chess server providing additional functionality.">
  <meta property="og:site_name" content="ChesslaBlab">
  <!-- Add CSS -->
  <link rel="stylesheet" href="/assets/css/fonts.css">
  <link rel="stylesheet" href="/assets/css/custom.css">
</head>
<body>
  <nav></nav>
  <main>
    <h1>Documentation</h1>
    <section>
    <h2>Chess Server for Web Apps</h2>
    <p>The ChesslaBlab <a href="https://github.com/chesslablab/chess-server">Chess Server</a> provides additional functionality to play chess online. It is based on WebSockets and can be hosted on a custom domain.</p>
    <p>This is how to open a WebSocket connection in JavaScript.</p>
    <pre>const ws = new WebSocket('wss://pchess.net:8443');</pre>
    <p>That's it!</p>
    <p>Now you're set up to start playing chess.</p>
    <pre>ws.send('/start classical analysis');</pre>
    <p>The <code>/start</code> command above starts a new classical chess game and retrieves a JSON response from the server.</p>
<pre>
{
  "\/start": {
    "variant":"classical",
    "mode":"analysis",
    "fen":"rnbqkbnr\/pppppppp\/8\/8\/8\/8\/PPPPPPPP\/RNBQKBNR w KQkq -"
  }
}
</pre>
    <p>On successful server response a FEN string representing the starting position is returned as well as the variant and the mode required.</p>
    <p>This is the classical starting position in FEN format.</p>
    <pre>rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -</pre>
    <p>As you can see in the server's response, forward slashes are escaped with a backslash. From now on this will be assumed, and forward slashes won't be escaped for the sake of simplicity and for documentation purposes.</p>
    <p>Now you're ready to make your first move.</p>
    <p>What about 1.e4?</p>
    <p>This is the so-called King's Pawn Game, one of the most popular chess openings, in Portable Game Notation (PGN) format. Humans can understand chess games in PGN easily but this format is not that great for computers as well as for graphic user interfaces (GUI) which may prefer the Long Algebraic Notation (LAN) format instead.</p>
    <p>Let's play 1.e4 in LAN format.</p>
    <pre>ws.send('/play_lan w e2e4');</pre>
    <p>The <code>/play_lan</code> command makes the chess move retrieving the following JSON response.</p>
<pre>
{
  "/play_lan": {
    "turn": "w",
    "isLegal": true,
    "isCheck": false,
    "isMate": false,
    "movetext": "1.e4",
    "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3",
    "pgn": "e4"
  }
}
</pre>
    <p>A popular response to 1.e4 is 1...e5 which in LAN format is e7e5.</p>
    <pre>ws.send('/play_lan b e7e5');</pre>
    <p>Once again the <code>/play_lan</code> command makes this chess move retrieving the following JSON response.</p>
<pre>
{
  "/play_lan": {
    "turn": "b",
    "isLegal": true,
    "isCheck": false,
    "isMate": false,
    "movetext": "1.e4 e5",
    "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6",
    "pgn": "e5"
  }
}
</pre>
    <p>Let's recap.</p>
    <p>Described below is the series of steps required to start a classical chess game with 1.e4 e5. Remember, computers and graphic user interfaces (GUIs) usually prefer the Long Algebraic Notation (LAN) format instead: e2e4 and e7e5.</p>
<pre>
const ws = new WebSocket('wss://pchess.net:8443');
ws.send('/start classical analysis');
ws.send('/play_lan w e2e4');
ws.send('/play_lan b e7e5');
</pre>
<p>The <code>/start</code> command accepts two mandatory params: A chess variant and a game mode. These two play an important role in shaping the way a chess game is started so here's a description of both.</p>
<table>
  <thead>
    <tr>
      <th colspan="2">Variant</th>
    </tr>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>960</td>
      <td>
          Chess960, also known as Fischer Random chess.
      </td>
    </tr>
    <tr>
      <td>capablanca</td>
      <td>
          Capablanca chess played on a 10×8 board.
      </td>
    </tr>
    <tr>
      <td>classical</td>
      <td>
          Classical chess.
      </td>
    </tr>
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th colspan="2">Mode</th>
    </tr>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>analysis</td>
      <td>
          Start a game from the start position for further analysis.
      </td>
    </tr>
    <tr>
      <td>gm</td>
      <td>
          Start a game from a PGN movetext to play with a grandmaster.
      </td>
    </tr>
    <tr>
      <td>fen</td>
      <td>
          Start a game from a FEN position for further analysis.
      </td>
    </tr>
    <tr>
      <td>pgn</td>
      <td>
          Start a game from a PGN movetext for further analysis.
      </td>
    </tr>
    <tr>
      <td>play</td>
      <td>
          Start a game to play online with an opponent.
      </td>
    </tr>
    <tr>
      <td>stockfish</td>
      <td>
          Start a game to play with the Stockfish chess engine.
      </td>
    </tr>
  </tbody>
</table>
<p>Now let's have a look at the WebSocket commands available!</p>
<p>The list of commands could have been sorted in alphabetical order but it is more convenient to begin with the <code>/start</code> command and continue in a way that's easier to understand.</p>
<details>
  <summary>/start</summary>
  <p>Starts a new chess game.</p>
  <p><b>Parameters</b></p>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Required</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>variant</td>
        <td>
          Accepts:
          <ul>
            <li>960</li>
            <li>capablanca</li>
            <li>classical</li>
          </ul>
        </td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>mode</td>
        <td>
          Accepts:
          <ul>
            <li>analysis</li>
            <li>gm</li>
            <li>fen</li>
            <li>pgn</li>
            <li>play</li>
            <li>stockfish</li>
          </ul>
        </td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>add</td>
        <td>
          Additional, specific params:
          <ul>
            <li>color (gm and stockfish modes)</li>
            <li>fen (fen mode)</li>
            <li>movetext (pgn mode)</li>
            <li>settings (play mode)</li>
            <li>startPos (pgn mode)</li>
          </ul>
        </td>
        <td>Maybe, depends on the mode selected.</td>
      </tr>
    </tbody>
  </table>
  <p><b>Example</b></p>
  <p>Starts a classical game for further analysis.</p>
<pre>ws.send('/start classical analysis');</pre>
  <p><b>Response</b></p>
<pre>
{
  "/start": {
    "variant": "classical",
    "mode": "analysis",
    "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -"
  }
}
</pre>
  <hr>
  <p><b>Example</b></p>
  <p>Starts a classical game in grandmaster mode.</p>
<pre>ws.send('/start classical gm w');</pre>
  <p><b>Response</b></p>
<pre>
{
  "/start": {
    "variant": "classical",
    "mode": "gm",
    "color": "w"
  }
}
</pre>
  <hr>
  <p><b>Example</b></p>
  <p>Starts a classical game in FEN mode for further analysis.</p>
<pre>ws.send('/start classical fen "r1bqkbnr/pppppppp/2n5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3"');</pre>
  <p><b>Response</b></p>
<pre>
{
  "/start": {
    "variant": "classical",
    "mode": "fen",
    "fen": "r1bqkbnr/pppppppp/2n5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3"
  }
}
</pre>
  <hr>
  <p><b>Example</b></p>
  <p>Starts a classical game in PGN mode for further analysis.</p>
<pre>ws.send('/start classical pgn "1.e4 Nc6 2.d4"');</pre>
  <p><b>Response</b></p>
<pre>
{
  "/start": {
    "variant": "classical",
    "mode": "pgn",
    "turn": "b",
    "movetext": "1.e4 Nc6 2.d4",
    "fen": "r1bqkbnr/pppppppp/2n5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3",
    "history": [
      [
        [
          " r ",
          " n ",
          " b ",
          " q ",
          " k ",
          " b ",
          " n ",
          " r "
        ],
        ...
        [
          " R ",
          " N ",
          " B ",
          " Q ",
          " K ",
          " B ",
          " N ",
          " R "
        ]
      ]
    ]
  }
}
</pre>
  <hr>
  <p><b>Example</b></p>
  <p>Starts a Chess960 game in PGN mode for further analysis.</p>
<pre>ws.send('/start 960 pgn "1.e4 Nc6 2.d4" BNRKQBRN');</pre>
  <p><b>Response</b></p>
<pre>
{
  "/start": {
    "variant": "960",
    "mode": "pgn",
    "turn": "b",
    "movetext": "1.e4 Nc6 2.d4",
    "fen": "b1rkqbrn/pppppppp/2n5/8/3PP3/8/PPP2PPP/BNRKQBRN b KQkq d3",
    "history": [
      [
        [
          " r ",
          " n ",
          " b ",
          " q ",
          " k ",
          " b ",
          " n ",
          " r "
        ],
        ...
        [
          " B ",
          " N ",
          " R ",
          " K ",
          " Q ",
          " B ",
          " R ",
          " N "
        ]
      ]
    ]
  }
}
</pre>
  <hr>
  <p><b>Example</b></p>
  <p>Creates an invite code (a hash) to play a classical game with a friend.</p>
<pre>ws.send('/start classical play {"min":5,"increment":3,"color":"b","submode":"friend"}');</pre>
  <p><b>Response</b></p>
<pre>
{
  "/start": {
    "variant": "classical",
    "mode": "play",
    "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -",
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwY2hlc3MubmV0IiwiaWF0IjoxNjc2NzYwNTgxLCJleHAiOjE2NzY3NjQxODEsInZhcmlhbnQiOiJjbGFzc2ljYWwiLCJzdWJtb2RlIjoiZnJpZW5kIiwiY29sb3IiOiJiIiwibWluIjo1LCJpbmNyZW1lbnQiOjMsImZlbiI6InJuYnFrYm5yXC9wcHBwcHBwcFwvOFwvOFwvOFwvOFwvUFBQUFBQUFBcL1JOQlFLQk5SIHcgS1FrcSAtIn0.jbVZGSaD9Q-QSrRkIdl-XXWMCuSV_4nrfJl28FObC24",
    "hash": "9eebcdf09342ef257407f341518b5d81"
  }
}
</pre>
  <hr>
  <p><b>Example</b></p>
  <p>Starts a classical game in Stockfish mode.</p>
<pre>ws.send('/start classical stockfish b');</pre>
  <p><b>Response</b></p>
<pre>
{
  "/start": {
    "variant": "classical",
    "mode": "stockfish",
    "color": "b"
  }
}
</pre>
    </details>
    <details>
      <summary>/legal_sqs</summary>
      <p>Returns the legal squares of a piece.</p>
      <p><b>Parameters</b></p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>position</td>
            <td>The location of the piece on the board.</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
      <p><b>Example</b></p>
      <p>Starts a classical game to find out the legal squares of the piece on e2.</p>
<pre>
ws.send('/start classical analysis');
ws.send('/legal_sqs e2');
</pre>
      <p><b>Response</b></p>
<pre>
{
  "/legal_sqs": {
    "color": "w",
    "id": "P",
    "sqs": [
      "e3",
      "e4"
    ]
  }
}
</pre>
    </details>
    <details>
      <summary>/play_lan</summary>
      <p>Plays a chess move in long algebraic notation (LAN) format.</p>
      <p><b>Parameters</b></p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>color</td>
            <td>The player's turn.</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>lan</td>
            <td>The chess move in LAN format.</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
      <p><b>Example</b></p>
      <p>Starts a classical game to play 1.e4.</p>
<pre>
ws.send('/start classical analysis');
ws.send('/play_lan w e2e4');
</pre>
      <p><b>Response</b></p>
<pre>
{
  "/play_lan": {
    "turn": "w",
    "isLegal": true,
    "isCheck": false,
    "isMate": false,
    "movetext": "1.e4",
    "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3",
    "pgn": "e4"
  }
}
</pre>
    </details>
    <details>
      <summary>/undo</summary>
      <p>Undoes the last move.</p>
      <p><b>Example</b></p>
      <p>Starts a classical game to play 1.e4 e5 2.f4 undoing the last move.</p>
<pre>
ws.send('/start classical analysis');
ws.send('/play_lan w e2e4');
ws.send('/play_lan b e7e5');
ws.send('/play_lan w f2f4');
ws.send('/undo');
</pre>
      <p><b>Response</b></p>
<pre>
{
  "/undo": {
    "turn": "w",
    "pgn": "e5",
    "castlingAbility": "KQkq",
    "movetext": "1.e4 e5",
    "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6",
    "isCheck": false,
    "isMate": false,
    "isStalemate": false,
    "mode": "analysis"
  }
}
</pre>
    </details>
    <details>
      <summary>/heuristics</summary>
      <p>
          Takes a balanced heuristic picture of the given PGN movetext.
          A chess game can be plotted in terms of balance.
          +1 is the best possible evaluation for White and -1 the best possible evaluation for Black.
          Both forces being set to 0 means they're balanced.
      </p>
      <p><b>Parameters</b></p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>movetext</td>
            <td>A portable game notation (PGN) movetext.</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
      <p><b>Example</b></p>
<pre>
ws.send('/start classical analysis');
ws.send('/heuristics "1.d4 Nf6 2.c4 e6 3.Nf3 b6 4.Nc3"');
</pre>
      <p><b>Response</b></p>
<pre>
{
  "/heuristics": {
    "dimensions": [
      "Material",
      "Center",
      "Connectivity",
      "Space",
      "Pressure",
      "King safety",
      "Tactics",
      "Attack",
      "Doubled pawn",
      "Passed pawn",
      "Isolated pawn",
      "Backward pawn",
      "Absolute pin",
      "Relative pin",
      "Absolute fork",
      "Relative fork",
      "Square outpost",
      "Knight outpost",
      "Bishop outpost",
      "Bishop pair",
      "Bad bishop",
      "Direct opposition"
    ],
    "balance": [
      [ 0, 0.38, -0.37, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      ...
      [ 0, 0.43, 0, 0.25, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]
  }
}
</pre>
    <p>
      The returned data can then be plotted on a chart as shown in the example below.
    </p>
    <img src="/assets/img/heuristics.png" alt="Chess heuristics">
    </details>
    <details>
      <summary>/heuristics_bar</summary>
      <p>
        Similar to the <code>/heuristics</code> command with the difference that <code>/heuristics_bar</code> takes a picture of the current position only rather than a picture of the entire game.
      </p>
      <p><b>Parameters</b></p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>fen</td>
            <td>A FEN string.</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>variant</td>
            <td>
              Accepts:
              <ul>
                <li>960</li>
                <li>capablanca</li>
                <li>classical</li>
              </ul>
            </td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
      <p><b>Example</b></p>
<pre>
ws.send('/start classical analysis');
ws.send('/heuristics_bar "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq -" classical');
</pre>
      <p><b>Response</b></p>
<pre>
{
  "/heuristics_bar": {
    "dimensions": [
      "Material",
      "Center",
      "Connectivity",
      "Space",
      "Pressure",
      "King safety",
      "Tactics",
      "Attack",
      "Doubled pawn",
      "Passed pawn",
      "Isolated pawn",
      "Backward pawn",
      "Absolute pin",
      "Relative pin",
      "Absolute fork",
      "Relative fork",
      "Square outpost",
      "Knight outpost",
      "Bishop outpost",
      "Bishop pair",
      "Bad bishop",
      "Direct opposition"
    ],
    "balance": [
      0, 0.28, 0, 0.07, 0, 0, 0, 0, 0, 0, 0, 0.04, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
  }
}
</pre>
    <p>
      The returned data can then be plotted on a chart as shown in the example below.
    </p>
    <img src="/assets/img/heuristics_bar.png" alt="Chess heuristics">
    </details>
    <blockquote>
      <p>To be continued. The commands available are being documented in this section, please be patient.</p>
    </blockquote>
    <p>Keep it up, and happy coding and learning!</p>
    </section>
  </main>
  <footer></footer>
  <!-- Include HTML -->
  <script src="/assets/js/include.js"></script>
</body>
</html>
