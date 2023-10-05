import { useDispatch, useSelector } from 'react-redux';
import CachedIcon from '@mui/icons-material/Cached';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button, Stack } from '@mui/material';
import * as board from 'features/board/boardSlice';
import * as panel from 'features/panel/panelSlice';

const History = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const dispatch = useDispatch();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        startIcon={<CachedIcon />}
        onClick={() => dispatch(board.flip())}
      />
      <Button
        startIcon={<FastRewindIcon />}
        disabled={stateBoard.fen.length - 1 - Math.abs(statePanel.history.back) === 0}
        onClick={() => dispatch(panel.goTo({ back: stateBoard.fen.length - 1 }))}
      />
      <Button
        startIcon={<SkipPreviousIcon />}
        disabled={stateBoard.fen.length - 1 - Math.abs(statePanel.history.back) === 0}
        onClick={() => {
          dispatch(panel.goBack());
          dispatch(board.browseHistory());
        }}
      />
      <Button
        startIcon={<SkipNextIcon />}
        disabled={statePanel.history.back === 0}
        onClick={() => {
          dispatch(panel.goForward());
          dispatch(board.browseHistory());
        }}
      />
      <Button
        startIcon={<FastForwardIcon />}
        disabled={statePanel.history.back === 0}
        onClick={() => {
          dispatch(panel.goToEnd());
          dispatch(board.browseHistory());
        }}
      />
    </Stack>
  );
}

export default History;
