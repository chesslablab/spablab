const openings = require('../assets/json/openings.json');

export default class Opening {
  static byEco = (eco) => {
    return openings.filter(item => item.eco.startsWith(eco));
  }

  static byMovetext = (movetext) => {
    let items = openings.filter(item => movetext.startsWith(item.movetext));
    let longest = items.reduce((a, b) => { return a.length > b.length ? a : b }, '');
    if (longest) {
      return [longest];
    }

    return null;
  }

  static bySameMovetext = (movetext) => {
    let items = openings.filter(item => movetext === item.movetext);
    if (items) {
      return items;
    }

    return null;
  }

  static byName = (name) => {
    return openings.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
  }
}
