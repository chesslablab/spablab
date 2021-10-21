import Wording from 'utils/Wording.js';
import modeActionTypes from '../../constants/modeActionTypes';

describe('contains()', () => {
  it('DRAW_ACCEPT contains ACCEPT', () => {
    const isContained = Wording.contains(modeActionTypes.DRAW_ACCEPT, Wording.verb.ACCEPT);
    expect(isContained).toBe(true);
  });
  it('DRAW_ACCEPT contains DECLINE', () => {
    const isContained = Wording.contains(modeActionTypes.DRAW_ACCEPT, Wording.verb.DECLINE);
    expect(isContained).toBe(false);
  });
});
