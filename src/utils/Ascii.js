import Pgn from 'utils/Pgn.js';

export default class Ascii {
  static board = [
    [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
    [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
    [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
    [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
    [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
    [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
    [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
    [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
  ];

  static toFen = (ascii) => {
    let string = '';
    ascii.forEach((item, i) => {
      string += item.join('').replace(/\s/g, '');
      if (i !== 7) {
        string += '/';
      }
    });

    let filtered = '';
    let strSplit = string.split('');
    let n = 1;
    strSplit.forEach((item, i) => {
      if (strSplit[i] === '.' && strSplit[i+1]) {
        if (strSplit[i+1] === '.') {
          n++;
        } else {
          filtered += n;
          n = 1;
        }
      } else if (strSplit[i] !== '.') {
        filtered += strSplit[i];
        n = 1;
      } else {
        filtered += 1;
      }
    });

    return filtered;
  }

  static flip = (color, ascii) => {
    if (color == Pgn.symbol.BLACK) {
      const flipped = [];
      for (let i = 0; i < 8; i++) {
        flipped.push(new Array(8));
      }
      ascii.forEach((rank, i) => {
        rank.forEach((file, j) => {
          flipped[7-i][7-j] = ascii[i][j];
        });
      });
      return flipped;
    }

    return ascii;
  }
}
