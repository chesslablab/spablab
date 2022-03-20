import Opening from 'utils/Opening.js';

describe('byMovetext()', () => {
  it('is 720 openings that start with A', () => {
    expect(Opening.byEco('A').length).toBe(720);
  });
  it('is 722 openings that start with B', () => {
    expect(Opening.byEco('B').length).toBe(722);
  });
  it('is 1168 openings that start with C', () => {
    expect(Opening.byEco('C').length).toBe(1168);
  });
  it('is 497 openings that start with D', () => {
    expect(Opening.byEco('D').length).toBe(497);
  });
  it('is 290 openings that start with D', () => {
    expect(Opening.byEco('E').length).toBe(290);
  });
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
