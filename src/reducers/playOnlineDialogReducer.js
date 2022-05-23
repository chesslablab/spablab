import playOnlineDialogActionTypes from '../constants/dialog/playOnlineDialogActionTypes';

const initialState = {
  open: false,
  rows: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case playOnlineDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
        rows: [],
      };
    case playOnlineDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
        rows: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
