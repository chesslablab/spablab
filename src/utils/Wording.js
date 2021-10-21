export default class Wording {
  static verb = {
    ACCEPT: 'ACCEPT',
    DECLINE: 'DECLINE',
    PROPOSE: 'PROPOSE',
    // ...
  };

  static verbs = [
    Wording.verb.ACCEPT,
    Wording.verb.DECLINE,
    Wording.verb.PROPOSE,
    // ...
  ];

  static extract = (haystack, needle) => {
    if (haystack.split('_').includes(needle)) {
      return needle;
    }

    return null;
  }
}
