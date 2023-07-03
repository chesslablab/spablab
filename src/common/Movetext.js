export default class Movetext {
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
            w: arr[i].split('.')[1],
            b: arr[i+1] ? arr[i+1] : ''
          });
        }
      });
    }

    return rows;
  }

  static toCommentedRows = (string) => {
    const filtered = string
      .replace(/(\{.*?\})/g, '')
      .replace(/  +/g, ' ')
      .replace(/[()]/g, '');
    const rows = Movetext.toRows(filtered);
    const comments = string.match(/\{(.*?)\}/g);
    rows.forEach((item, i) => {
      comments?.forEach((comment, j) => {
        if (string.includes(`${item.n}.${item.w} ${comment}`)) {
          item.w += ` ${comment.replace(/[{}]/g, '')}`;
        } else if (string.includes(`${item.n}.${item.w} ${item.b} ${comment}`)) {
          item.b += ` ${comment.replace(/[{}]/g, '')}`;
        } else if (string.includes(`${item.n}...${item.b} ${comment}`)) {
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
