import React from 'react';
import DrawAcceptDialog from '../../features/dialog/DrawAcceptDialog';
import DrawOfferDialog from '../../features/dialog/DrawOfferDialog';
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
