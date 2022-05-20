import playOnlineDialogActionTypes from '../constants/dialog/playOnlineDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case playOnlineDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false
      };
    case playOnlineDialogActionTypes.OPEN:
      return {
        ...state,
        open: true
      }
    default:
      return state;
  }
};

export default reducer;
