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

    return this.filter(string);
  }

  static filter = (string) => {
    let filtered = '';
    let strSplit = string.split('');
    let n = 1;
    strSplit.forEach((item, i) => {
      if (strSplit[i] === '.' && strSplit[i+1] === '.') {
          n++;
      } else if (strSplit[i] === '.' && strSplit[i+1] !== '.') {
          filtered += n;
          n = 1;
      } else if (strSplit[i] !== '.') {
          filtered += strSplit[i];
          n = 1;
      }
    });

    return filtered;
  }
}
