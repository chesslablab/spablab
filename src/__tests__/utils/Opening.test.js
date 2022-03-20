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
  it('is 0 openings that start with foo', () => {
    expect(Opening.byMovetext('foo').length).toBe(0);
  });
  it('is 990 openings that start with 1.e4 e5', () => {
    expect(Opening.byMovetext('1.e4 e5').length).toBe(990);
  });
  it('is 651 openings that starts with 1.e4 e5 2.Nf3', () => {
    expect(Opening.byMovetext('1.e4 e5 2.Nf3').length).toBe(651);
  });
});
