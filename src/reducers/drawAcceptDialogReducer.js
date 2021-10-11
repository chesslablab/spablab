import drawAcceptDialogActionTypes from '../constants/drawAcceptDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case drawAcceptDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case drawAcceptDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
