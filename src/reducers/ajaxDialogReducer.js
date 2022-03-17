import ajaxDialogActionTypes from '../constants/dialog/ajaxDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ajaxDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case ajaxDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
