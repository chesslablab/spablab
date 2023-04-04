export default class Movetext {
  static toRows = (string) => {
    let rows = [];
    if (string) {
      const arr = string.split(' ');
      arr.map((item, i) => {
        if (i % 2 === 0) {
          rows.push({
            w: arr[i].split('.')[1],
            b: arr[i+1] ? arr[i+1] : ''
          });
        }
      });
    }

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
