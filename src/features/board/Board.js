import ActiveBoard from 'features/board/ActiveBoard';
import PawnPromotionDialog from 'features/board/PawnPromotionDialog';
import ResizeSlider from 'features/board/ResizeSlider';
import Sounds from 'features/board/Sounds';

const Board = () => {
  return (
    <>
      <ActiveBoard />
      <ResizeSlider />
      <PawnPromotionDialog />
      <Sounds />
    </>
  );
}

export default Board;
