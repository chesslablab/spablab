import React from 'react';
import AcceptRematchDialog from 'features/mode/play/dialog/AcceptRematchDialog';
import OfferRematchDialog from 'features/mode/play/dialog/OfferRematchDialog';

const FinishedDialogsPlayMode = () => {
  return (
    <div>
      <AcceptRematchDialog />
      <OfferRematchDialog />
    </div>
  );
}

export default FinishedDialogsPlayMode;
