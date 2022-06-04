import React from 'react';
import RematchAcceptDialog from '../../features/dialog/RematchAcceptDialog';
import RematchOfferDialog from '../Dialog/RematchOfferDialog';

const FinishedDialogsPlayMode = () => {
  return (
    <div>
      <RematchAcceptDialog />
      <RematchOfferDialog />
    </div>
  );
}

export default FinishedDialogsPlayMode;
