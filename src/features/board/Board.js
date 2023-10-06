import ActiveBoard from 'features/board/ActiveBoard';
import PawnPromotionDialog from 'features/board/PawnPromotionDialog';
import ResizeSlider from './ResizeSlider';

const Board = () => {
  return (
    <>
      <ActiveBoard />
      <ResizeSlider />
      <PawnPromotionDialog />
    </>
  );
}

export default Board;
