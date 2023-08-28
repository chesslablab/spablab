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
  const state = useSelector(state => state);
  
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
        disabled={state.board.fen.length - 1 - Math.abs(state.panel.history.back) === 0}
        onClick={() => dispatch(panel.goTo({ back: state.board.fen.length - 1 }))}
      />
      <Button
        startIcon={<SkipPreviousIcon />}
        disabled={state.board.fen.length - 1 - Math.abs(state.panel.history.back) === 0}
        onClick={() => {
          dispatch(panel.goBack());
          dispatch(board.browseHistory());
        }}
      />
      <Button
        startIcon={<SkipNextIcon />}
        disabled={state.panel.history.back === 0}
        onClick={() => {
          dispatch(panel.goForward());
          dispatch(board.browseHistory());
        }}
      />
      <Button
        startIcon={<FastForwardIcon />}
        disabled={state.panel.history.back === 0}
        onClick={() => {
          dispatch(panel.goToEnd());
          dispatch(board.browseHistory());
        }}
      />
    </Stack>
  );
}

export default History;
