import Opening from 'utils/Opening.js';

describe('byMovetext()', () => {
  it('starts with 1.e4 e5', () => {
    const openings = Opening.startsWith('1.e4 e5');
    expect(openings.length).toBe(990);
  });
});
