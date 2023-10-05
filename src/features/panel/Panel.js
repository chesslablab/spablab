import { useSelector } from 'react-redux';
import FenPanel from 'features/mode/fen/panel/FenPanel';
import PlayPanel from 'features/mode/play/panel/PlayPanel';
import RavPanel from 'features/mode/rav/panel/RavPanel';
import SanPanel from 'features/mode/san/panel/SanPanel';
import StockfishPanel from 'features/mode/stockfish/panel/StockfishPanel';

const Panel = () => {
  const stateFenMode = useSelector(state => state.fenMode);

  const statePlayMode = useSelector(state => state.playMode);

  const stateRavMode = useSelector(state => state.ravMode);

  const stateSanMode = useSelector(state => state.sanMode);

  const stateStockfishMode = useSelector(state => state.stockfishMode);

  if (stateFenMode.active) {
    return (
      <FenPanel />
    );
  } else if (statePlayMode.active) {
    return (
      <PlayPanel/>
    );
  } else if (stateRavMode.active) {
    return (
      <RavPanel />
    );
  } else if (stateSanMode.active) {
    return (
      <SanPanel />
    );
  } else if (stateStockfishMode.active) {
    return (
      <StockfishPanel />
    );
  }
};

export default Panel;
