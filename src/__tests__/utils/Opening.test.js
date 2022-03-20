import Opening from 'utils/Opening.js';

describe('byEco()', () => {
  it('is 720 starting with A', () => {
    expect(Opening.byEco('A').length).toBe(720);
  });
  it('is 722 starting with B', () => {
    expect(Opening.byEco('B').length).toBe(722);
  });
  it('is 1168 starting with C', () => {
    expect(Opening.byEco('C').length).toBe(1168);
  });
  it('is 497 starting with D', () => {
    expect(Opening.byEco('D').length).toBe(497);
  });
  it('is 290 starting with D', () => {
    expect(Opening.byEco('E').length).toBe(290);
  });
});

describe('byMovetext()', () => {
  it('is 0 starting with foo', () => {
    expect(Opening.byMovetext('foo').length).toBe(0);
  });
  it('is 990 starting with 1.e4 e5', () => {
    expect(Opening.byMovetext('1.e4 e5').length).toBe(990);
  });
  it('is 651 starting with 1.e4 e5 2.Nf3', () => {
    expect(Opening.byMovetext('1.e4 e5 2.Nf3').length).toBe(651);
  });
});

describe('Name()', () => {
  it('is 381 including Sicilian', () => {
    expect(Opening.byName('Sicilian').length).toBe(381);
  });
  it('is 381 including sicilian', () => {
    expect(Opening.byName('sicilian').length).toBe(381);
  });
});
