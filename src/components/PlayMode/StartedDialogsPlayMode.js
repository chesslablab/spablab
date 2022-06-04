import React from 'react';
import DrawAcceptDialog from '../../features/dialog/DrawAcceptDialog';
import DrawOfferDialog from '../../features/dialog/DrawOfferDialog';
import ResignAcceptDialog from '../../features/dialog/ResignAcceptDialog';
import TakebackAcceptDialog from '../../features/dialog/TakebackAcceptDialog';
import TakebackOfferDialog from '../..features/dialog/TakebackOfferDialog';

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
