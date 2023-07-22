import Nag from './Nag.js';

export default class Movetext {
  static description = (string) => {
    if (string.startsWith('{')) {
      let match = string.match(/{([^}]+)}/g)[0];
      return match.substring(1, match.length - 1);
    }

    return null;
  }

  static toRows = (string) => {
    let n = 1;
    let rows = [];
    if (string) {
      const arr = string.split(' ').filter(item => item);
      if (/^[1-9][0-9]*\.\.\.(.*)/.exec(string)) {
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

  static toCommentedRows = (string, nBreakdown) => {
    const filtered = string
      .replace(/(\{.*?\})/g, '')
      .replace(/\$[1-9][0-9]*/g, '')
      .replace(/  +/g, ' ')
      .replace(/[()]/g, '');

    const rows = Movetext.toRows(filtered);

    let commented = string;

    string.match(/\$[1-9][0-9]*/g)?.forEach((nag, i) => {
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

  static substring = (string, back) => {
    let substring = '';
    const arr = string.split(' ');
    arr.forEach((item, i) => {
      if (i <= arr.length - 1 + back) {
        substring += `${item} `;
      }
    });

    return substring.slice(0, -1);
  }
}
