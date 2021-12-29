export default class Movetext {
  static toRows = (string) => {
    let rows = [];
    const arr = string.split(' ');
    arr.map((item, i) => {
      if (i % 2 === 0) {
        rows.push({
          w: arr[i].split('.')[1],
          b: arr[i+1] ? arr[i+1] : ''
        });
      }
    });

    return rows;
  }
}
