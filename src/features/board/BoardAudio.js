import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import captureAudio from 'assets/mp3/capture.mp3';
import checkAudio from 'assets/mp3/check.mp3';
import moveAudio from 'assets/mp3/move.mp3';

const BoardAudio = () => {
  const stateBoard = useSelector(state => state.board);

  useEffect(() => {
    if (stateBoard.isCheck) {
      new Audio(checkAudio).play();
    } else if (stateBoard.isCapture) {
      new Audio(captureAudio).play();
    } else {
      new Audio(moveAudio).play();
    }
  }, [
    stateBoard.isCatpure,
    stateBoard.isCheck,
    stateBoard.movetext
  ]);
}

export default BoardAudio;
