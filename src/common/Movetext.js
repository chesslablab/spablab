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

  static toCommentedRows = (string) => {
    const filtered = string
      .replace(/(\{.*?\})/g, '')
      .replace(/\$[1-9][0-9]*/g, '')
      .replace(/  +/g, ' ')
      .replace(/[()]/g, '');

    const rows = Movetext.toRows(filtered);

    const noNags = string
      .replace(/\$[1-9][0-9]*/g, '')
      .replace(/  +/g, ' ');

    const noComments = string
      .replace(/(\{.*?\})/g, '')
      .replace(/  +/g, ' ');

    rows.forEach((item, i) => {
      string.match(/\$[1-9][0-9]*/g)?.forEach((nag, j) => {
        const comment = Nag.comment(nag);
        if (noComments.includes(`${item.n}.${item.w} ${nag}`)) {
          item.w += ` ${comment}`;
        } else if (noComments.includes(`${item.n}.${item.w} ${item.b} ${nag}`)) {
          item.b += ` ${comment}`;
        } else if (noComments.includes(`${item.n}...${item.b} ${nag}`)) {
          item.b += ` ${comment}`;
        } else if (noComments.includes(`${item.b} ${nag}`)) {
          item.b += ` ${comment}`;
        }
      });
    });

    rows.forEach((item, i) => {
      string.match(/\{(.*?)\}/g)?.forEach((comment, j) => {
        if (noNags.includes(`${item.n}.${item.w?.split(' ')[0]} ${comment}`)) {
          item.w += ` ${comment.replace(/[{}]/g, '')}`;
        } else if (noNags.includes(`${item.n}.${item.w} ${item.b?.split(' ')[0]} ${comment}`)) {
          item.b += ` ${comment.replace(/[{}]/g, '')}`;
        } else if (noNags.includes(`${item.n}...${item.b?.split(' ')[0]} ${comment}`)) {
          item.b += ` ${comment.replace(/[{}]/g, '')}`;
        } else if (noNags.includes(`${item.b?.split(' ')[0]} ${comment}`)) {
          item.b += ` ${comment.replace(/[{}]/g, '')}`;
        }
      });
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
