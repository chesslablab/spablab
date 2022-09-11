import React from 'react';
import AcceptRematchDialog from '../../../features/dialog/AcceptRematchDialog';
import OfferRematchDialog from '../../../features/dialog/OfferRematchDialog';

const FinishedDialogsPlayMode = () => {
  return (
    <div>
      <AcceptRematchDialog />
      <OfferRematchDialog />
    </div>
  );
}

export default FinishedDialogsPlayMode;
