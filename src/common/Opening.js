const openings = require('../assets/json/openings.json');

export default class Opening {
  static byEco = (eco) => {
    return openings.filter(item => item.eco.startsWith(eco));
  }

  static byMovetext = (movetext) => {
    let items = openings.filter(item => movetext.startsWith(item.movetext));
    let longest = items.reduce((a, b) => { return a.length > b.length ? a : b }, '');

    return [longest];
  }

  static byName = (name) => {
    return openings.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
  }

  static analysis = (movetext, size = 15) => {
    return Opening.byMovetext(movetext).sort(() => Math.random() - 0.5).slice(0, size);
  }
}
