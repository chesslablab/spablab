'use client'

import ActiveBoard from 'features/board/ActiveBoard';
import PawnPromotionDialog from 'features/board/PawnPromotionDialog';
import BoardAudio from 'features/board/BoardAudio';

const Board = () => {
  return (
    <>
      <ActiveBoard />
      <PawnPromotionDialog />
      <BoardAudio />
    </>
  );
}

export default Board;
