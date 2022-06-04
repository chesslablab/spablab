import React from 'react';
import RematchAcceptDialog from '../../features/dialog/RematchAcceptDialog';
import RematchOfferDialog from '../../features/dialog/RematchOfferDialog';

const FinishedDialogsPlayMode = () => {
  return (
    <div>
      <RematchAcceptDialog />
      <RematchOfferDialog />
    </div>
  );
}

export default FinishedDialogsPlayMode;
