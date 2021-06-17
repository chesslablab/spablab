import Ascii from 'utils/Ascii.js';

describe('toFen()', () => {
  it('starting position', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    expect(Ascii.toFen(board)).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  });
});
