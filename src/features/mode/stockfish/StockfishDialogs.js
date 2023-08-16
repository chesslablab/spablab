import React from 'react';
import CheckmateSkillsDialog from 'features/mode/stockfish/dialog/CheckmateSkillsDialog';
import EndgameSkillsDialog from 'features/mode/stockfish/dialog/EndgameSkillsDialog';
import PlayComputerDialog from 'features/mode/stockfish/dialog/PlayComputerDialog';

const StockfishDialogs = () => {
  return (
    <>
      <CheckmateSkillsDialog />
      <EndgameSkillsDialog />
      <PlayComputerDialog />
    </>
  );
}

export default StockfishDialogs;
