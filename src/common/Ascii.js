import Pgn from './Pgn.js';

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
    Ascii.promote(ascii).forEach((item, i) => {
      string += item.join('').replace(/\s/g, '');
      if (i !== 7) {
        string += '/';
      }
    });
    let filtered = '';
    let strSplit = string.split('');
    let n = 1;
    strSplit.forEach((item, i) => {
      if (strSplit[i] === '.') {
        if (strSplit[i+1] === '.') {
          n++;
        } else {
          filtered += n;
          n = 1;
        }
      } else {
        filtered += strSplit[i];
        n = 1;
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

  static toAscii = (fen) => {
    let ascii = [];
    fen.split('/').forEach((rank, i) => {
      let row = [];
      rank.split('').forEach((char, i) => {
        if (isNaN(char)) {
          row = row.concat(` ${char} `);
        } else {
          let empty = ' . ,'.repeat(parseInt(char)).split(',').filter(Boolean);
          row = row.concat(empty);
        }
      });
      ascii.push(row);
    });

    return ascii;
  }

  static fromIndexToAlgebraic = (i, j) => {
    const file = String.fromCharCode(97 + j);
    const rank = 8 - i;

    return file + rank;
  }

  static fromAlgebraicToIndex = (square) => {
    const i = 8 - square.charAt(1);
    const j = square.charAt(0).charCodeAt(0) - 97;

    return [i, j];
  }

  static promote = (ascii) => {
    ascii[0] = ascii[0].map(item => item === ' P ' ? ' Q ' : item);
    ascii[7] = ascii[7].map(item => item === ' p ' ? ' q ' : item);

    return ascii;
  }

  static asciiDiff = (a, b) => {
    let sqs = [];
    a.forEach((rank, i) => {
      rank.forEach((file, j) => {
        if (a[i][j] !== b[i][j]) {
          sqs.push({
            from: a[i][j],
            to: b[i][j],
            sq: Ascii.fromIndexToAlgebraic(i, j)
          });
        }
      });
    });

    return sqs;
  }

  static sqDiff = (a, b) => {
    let diff = {
      files: Math.abs(a.charCodeAt(0) - b.charCodeAt(0)),
      ranks: Math.abs(a.charCodeAt(1) - b.charCodeAt(1))
    };

    return diff;
  }

  static xAxisSign = (a, b, color, flip) => {
    const sign =  Math.sign(a.charCodeAt(0) - b.charCodeAt(0));
    if (color === Pgn.symbol.WHITE) {
      if (flip === Pgn.symbol.WHITE) {
        return -sign;
      } else {
        return sign;
      }
    } else {
      if (flip === Pgn.symbol.WHITE) {
        return -sign;
      } else {
        return sign;
      }
    }
  }

  static yAxisSign = (a, b, color, flip) => {
    const sign =  Math.sign(a.charCodeAt(1) - b.charCodeAt(1));
    if (color === Pgn.symbol.WHITE) {
      if (flip === Pgn.symbol.WHITE) {
        return sign;
      } else {
        return -sign;
      }
    } else {
      if (flip === Pgn.symbol.WHITE) {
        return sign;
      } else {
        return -sign;
      }
    }
  }

  static longAlgebraicNotation = (a, b) => {
    const diff = Ascii.asciiDiff(a, b);
    let sorted = [];
    if (diff[0].to === ' . ') {
      sorted.push(diff[0].sq);
      sorted.push(diff[1].sq);
    } else {
      sorted.push(diff[1].sq);
      sorted.push(diff[0].sq);
    }

    return sorted;
  }
}
