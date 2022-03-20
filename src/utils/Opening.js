const openings = require('../assets/js/openings.json');

export default class Opening {
  static startsWith = (movetext) => {
    return openings.filter(item => item.movetext.startsWith(movetext));
  }
}
