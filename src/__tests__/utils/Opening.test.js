import Opening from 'utils/Opening.js';

describe('byMovetext()', () => {
  it('starts with foo', () => {
    const openings = Opening.startsWith('foo');
    expect(openings.length).toBe(0);
  });
  it('starts with 1.e4 e5', () => {
    const openings = Opening.startsWith('1.e4 e5');
    expect(openings.length).toBe(990);
  });
  it('starts with 1.e4 e5 2.Nf3', () => {
    const openings = Opening.startsWith('1.e4 e5 2.Nf3');
    expect(openings.length).toBe(651);
  });
});
