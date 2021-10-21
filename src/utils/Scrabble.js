export default class Scrabble {
  static verb = {
    ACCEPT: 'ACCEPT',
    DECLINE: 'DECLINE',
    PROPOSE: 'PROPOSE',
    // ...
  };

  static verbs = [
    Scrabble.verb.ACCEPT,
    Scrabble.verb.DECLINE,
    Scrabble.verb.PROPOSE,
    // ...
  ];

  static contains = (haystack, needle) => {
    return haystack.split('_').includes(needle);
  }
}
