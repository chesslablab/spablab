import React from 'react';
import AcceptDrawDialog from 'features/mode/play/dialog/AcceptDrawDialog';
import OfferDrawDialog from 'features/mode/play/dialog/OfferDrawDialog';
import AcceptResignDialog from 'features/mode/play/dialog/AcceptResignDialog';
import AcceptTakebackDialog from 'features/mode/play/dialog/AcceptTakebackDialog';
import OfferTakebackDialog from 'features/mode/play/dialog/OfferTakebackDialog';

const StartedDialogsPlayMode = () => {
  return (
    <div>
      <AcceptDrawDialog />
      <OfferDrawDialog />
      <AcceptResignDialog />
      <AcceptTakebackDialog />
      <OfferTakebackDialog />
    </div>
  );
}

export default StartedDialogsPlayMode;
