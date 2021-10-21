import Scrabble from 'utils/Scrabble.js';
import modeActionTypes from '../../constants/modeActionTypes';

describe('contains()', () => {
  it('DRAW_ACCEPT contains ACCEPT', () => {
    const isContained = Scrabble.contains(modeActionTypes.DRAW_ACCEPT, Scrabble.verb.ACCEPT);
    expect(isContained).toBe(true);
  });
  it('DRAW_ACCEPT contains DECLINE', () => {
    const isContained = Scrabble.contains(modeActionTypes.DRAW_ACCEPT, Scrabble.verb.DECLINE);
    expect(isContained).toBe(false);
  });
});
