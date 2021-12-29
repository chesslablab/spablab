export default class Movetext {
  static toRows = (string) => {
    let rows = [];
    const arr = string.split(' ');
    arr.map((item, i) => {
      if (i === 0) {
        arr[i+1]
          ? rows.push({ w: arr[i].split('.')[1], b: arr[i+1] })
          : rows.push({ w: arr[i].split('.')[1], b: '' });
      }
    });

    return rows;
  }
}
