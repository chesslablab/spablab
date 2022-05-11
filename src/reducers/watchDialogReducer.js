import watchDialogActionTypes from '../constants/dialog/watchDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case watchDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false
      };
    case watchDialogActionTypes.OPEN:
      return {
        ...state,
        open: true
      }
    default:
      return state;
  }
};

export default reducer;
