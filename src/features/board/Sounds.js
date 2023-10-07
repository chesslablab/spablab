import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import captureAudio from 'assets/mp3/capture.mp3';
import checkAudio from 'assets/mp3/check.mp3';
import moveAudio from 'assets/mp3/move.mp3';

const Sound = () => {
  const stateBoard = useSelector(state => state.board);

  const getLastBySplit = (data, del) => {
    const splitData = data?.split(del) || [];
    const lastSplitEl = splitData[splitData.length - 1];

    return lastSplitEl;
  }

  const isCapture = movetext => {
    const lastMove = getLastBySplit(movetext, ' ');
    const lastMoveName = getLastBySplit(lastMove, '.');

    return lastMoveName?.[1] === 'x';
  }

  useEffect(() => {
    if (stateBoard.isCheck) {
      new Audio(checkAudio).play();
    } else if (isCapture(stateBoard.movetext)) {
      new Audio(captureAudio).play();
    } else {
      new Audio(moveAudio).play();
    }
  }, [
    stateBoard.isCheck,
    stateBoard.movetext
  ]);
}

export default Sound;
