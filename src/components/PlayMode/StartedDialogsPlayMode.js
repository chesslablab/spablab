import React from 'react';
import DrawAcceptDialog from '../Dialog/DrawAcceptDialog';
import DrawOfferDialog from '../Dialog/DrawOfferDialog';
import ResignAcceptDialog from '../Dialog/ResignAcceptDialog';
import TakebackAcceptDialog from '../Dialog/TakebackAcceptDialog';
import TakebackOfferDialog from '../Dialog/TakebackOfferDialog';

const StartedDialogsPlayMode = () => {
  return (
    <div>
      <DrawAcceptDialog />
      <DrawOfferDialog />
      <ResignAcceptDialog />
      <TakebackAcceptDialog />
      <TakebackOfferDialog />
    </div>
  );
}

export default StartedDialogsPlayMode;
