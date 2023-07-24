import Nag from './Nag.js';

export default class Movetext {
  static description = (str) => {
    if (str.startsWith('{')) {
      let match = str.match(/{([^}]+)}/g)[0];
      return match.substring(1, match.length - 1);
    }

    return null;
  }

  static toRows = (str) => {
    let n = 1;
    let rows = [];
    if (str) {
      const arr = str.split(' ').filter(item => item);
      if (/^[1-9][0-9]*\.\.\.(.*)/.exec(str)) {
        const exploded = arr[0].split('...');
        n = parseInt(exploded[0]);
        rows.push({
          n: n,
          w: '...',
          b: exploded[1],
        });
        arr.shift();
      } else {
        const exploded = arr[0].split('.');
        n = parseInt(exploded[0]);
        rows.push({
          n: n,
          w: arr[0].split('.')[1],
          b: arr[1]
        });
        arr.shift();
        arr.shift();
      }
      arr.forEach((item, i) => {
        if (i % 2 === 0) {
          n += 1;
          rows.push({
            n: n,
            w: arr[i].split('.')[1] ?? arr[i],
            ...(arr[i+1] && {b: /^[1-9][0-9]*\.\.\.(.*)/.exec(arr[i+1]) ? arr[i+1].split('...')[1] : arr[i+1]})
          });
        }
      });
    }

    return rows;
  }

  static toCommentedRows = (str, nBreakdown) => {
    const rows = Movetext.toRows(
      str.replace(/(\{.*?\})/g, '')
        .replace(/\$[1-9][0-9]*/g, '')
        .replace(/  +/g, ' ')
        .replace(/[()]/g, '')
    );

    let commented = str;

    str.match(/\$[1-9][0-9]*/g)?.forEach((nag, i) => {
      commented = commented.replace(nag, `{${Nag.comment(nag)}}`);
    });

    rows.forEach(row => {
      commented.match(/\{(.*?)\}/g)?.forEach(comment => {
        if (commented.includes(`${row.n}.${row.w} ${comment}`)) {
          row.w += ` ${comment}`;
        } else if (commented.includes(`${row.n}.${row.w} ${row.b} ${comment}`)) {
          row.b += ` ${comment}`;
        } else if (commented.includes(`${row.n}...${row.b} ${comment}`)) {
          row.b += ` ${comment}`;
        } else if (commented.includes(`${row.b} ${comment}`)) {
          row.b += ` ${comment}`;
        }
      });
      row.w = row.w.replace(/[{}]/g, '');
      row.b = row.b?.replace(/[{}]/g, '');
      row.nBreakdown = nBreakdown;
    });

    return rows;
  }

  static substring = (str, back) => {
    let substr = '';
    const arr = str.split(' ');
    arr.forEach((item, i) => {
      if (i <= arr.length - 1 + back) {
        substr += `${item} `;
      }
    });

    return substr.slice(0, -1);
  }

  static openParentheses = (str) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        count += 1;
      } else if (str[i] === ')') {
        count -= 1;
      }
    }

    return count;
  }

  static rgb = (r, g, b) => `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;

  static haystack = (str) => str.replace(/(\{.*?\})/g, '')
    .replace(/\s?\$[1-9][0-9]*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\( /g, '(')
    .replace(/ \)/g, ')')
    .trim();

  static needles = (rows) => {
    return rows.map(row =>
      row.w === '...'
        ? `${row.n}...${row.b.replace(/ .*/,'') ?? ''}`.trim()
        : `${row.n}.${row.w.replace(/ .*/,'')} ${row.b?.replace(/ .*/,'') ?? ''}`.trim()
      );
  }
}
