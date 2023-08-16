import React from 'react';
import { useSelector } from 'react-redux';
import FenPanel from 'features/mode/fen/panel/FenPanel';
import PlayPanel from 'features/mode/play/panel/PlayPanel';
import RavPanel from 'features/mode/rav/panel/RavPanel';
import SanPanel from 'features/mode/san/panel/SanPanel';
import StockfishPanel from 'features/mode/stockfish/panel/StockfishPanel';

const Panel = ({ props }) => {
  const state = useSelector(state => state);

  if (state.fenMode.active) {
    return (
      <FenPanel props={props} />
    );
  } else if (state.playMode.active) {
    return (
      <PlayPanel props={props} />
    );
  } else if (state.ravMode.active) {
    return (
      <RavPanel />
    );
  } else if (state.sanMode.active) {
    return (
      <SanPanel props={props} />
    );
  } else if (state.stockfishMode.active) {
    return (
      <StockfishPanel props={props} />
    );
  }
};

export default Panel;
