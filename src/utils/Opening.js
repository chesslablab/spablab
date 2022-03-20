const openings = require('../assets/js/openings.json');

export default class Opening {
  static byEco = (eco) => {
    return openings.filter(item => item.eco.startsWith(eco));
  }

  static byMovetext = (movetext) => {
    return openings.filter(item => item.movetext.startsWith(movetext));
  }
}
