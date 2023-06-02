import React from 'react';
import AcceptDrawDialog from 'features/mode/play/dialog/AcceptDrawDialog';
import OfferDrawDialog from 'features/mode/play/dialog/OfferDrawDialog';
import AcceptTakebackDialog from 'features/mode/play/dialog/AcceptTakebackDialog';
import OfferTakebackDialog from 'features/mode/play/dialog/OfferTakebackDialog';

const StartedDialogsPlayMode = () => {
  return (
    <div>
      <AcceptDrawDialog />
      <OfferDrawDialog />
      <AcceptTakebackDialog />
      <OfferTakebackDialog />
    </div>
  );
}

export default StartedDialogsPlayMode;
