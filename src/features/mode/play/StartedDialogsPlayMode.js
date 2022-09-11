import React from 'react';
import AcceptDrawDialog from '../../../features/dialog/AcceptDrawDialog';
import OfferDrawDialog from '../../../features/dialog/OfferDrawDialog';
import AcceptResignDialog from '../../../features/dialog/AcceptResignDialog';
import AcceptTakebackDialog from '../../../features/dialog/AcceptTakebackDialog';
import OfferTakebackDialog from '../../../features/dialog/OfferTakebackDialog';

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
