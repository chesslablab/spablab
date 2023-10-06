import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkCapture } from 'utils/general.utils';

import { MOVE_SOUND_ID, MOVE_SOUND_NODES } from './moveSounds.constants';

const MoveSounds = () => {
  const isCheck = useSelector(state => state.board.isCheck);
  const moveText = useSelector(state => state.board.movetext);

  useEffect(() => {
    let soundId = MOVE_SOUND_ID.MOVE;
    if (isCheck) {
      soundId = MOVE_SOUND_ID.CHECK;
    } else if (checkCapture(moveText)) {
      soundId = MOVE_SOUND_ID.CAPTURE;
    }
    if (soundId) MOVE_SOUND_NODES[soundId].play(); 
  }, [isCheck, moveText]);

  return null;
}

export default MoveSounds;
