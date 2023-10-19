import ActiveBoard from 'features/board/ActiveBoard';
import PawnPromotionDialog from 'features/board/PawnPromotionDialog';
import ResizeSlider from 'features/board/ResizeSlider';
import BoardAudio from 'features/board/BoardAudio';

export const Board = () => {
  return (
    <>
      <ActiveBoard />
      <ResizeSlider />
      <PawnPromotionDialog />
      <BoardAudio />
    </>
  );
}
