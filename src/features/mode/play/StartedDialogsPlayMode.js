import React from 'react';
import AcceptDrawDialog from 'features/mode/play/dialog/AcceptDrawDialog';
import AcceptTakebackDialog from 'features/mode/play/dialog/AcceptTakebackDialog';

const StartedDialogsPlayMode = () => {
  return (
    <div>
      <AcceptDrawDialog />
      <AcceptTakebackDialog />
    </div>
  );
}

export default StartedDialogsPlayMode;
