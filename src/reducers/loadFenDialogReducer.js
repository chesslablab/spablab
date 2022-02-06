import loadFenDialogActionTypes from '../constants/dialog/loadFenDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case loadFenDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case loadFenDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
