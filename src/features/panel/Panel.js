import React from 'react';
import { useSelector } from 'react-redux';
import FenPanel from 'features/panel/fen/FenPanel';
import PlayPanel from 'features/panel/play/PlayPanel';
import RavPanel from 'features/panel/rav/RavPanel';
import SanPanel from 'features/panel/san/SanPanel';
import StockfishPanel from 'features/panel/stockfish/StockfishPanel';

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
      <RavPanel props={props} />
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
