import { useEffect } from 'react';
import captureAudio from 'assets/mp3/capture.mp3';
import checkAudio from 'assets/mp3/check.mp3';
import { useSelector } from 'react-redux';
import { checkCapture } from 'utils/general.utils';

const MoveSounds = () => {
  const isCheck = useSelector(state => state.board.isCheck);
  const moveText = useSelector(state => state.board.movetext);

  useEffect(() => {
    if (isCheck) {
      (new Audio(checkAudio)).play();
    } else if (checkCapture(moveText)) {
      (new Audio(captureAudio)).play();
    }
  }, [moveText, isCheck]);

  return null;
}

export default MoveSounds;
