import resignAcceptDialogActionTypes from '../constants/dialog/resignAcceptDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case resignAcceptDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case resignAcceptDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
