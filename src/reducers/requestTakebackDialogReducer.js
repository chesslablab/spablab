import requestTakebackDialogActionTypes from '../constants/requestTakebackDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case requestTakebackDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case requestTakebackDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
