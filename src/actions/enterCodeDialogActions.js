import enterCodeDialogActions from '../constants/enterCodeDialogActionTypes';

export const close = () => ({
  type: enterCodeDialogActions.CLOSE
});

export const open = () => ({
  type: enterCodeDialogActions.OPEN
});
