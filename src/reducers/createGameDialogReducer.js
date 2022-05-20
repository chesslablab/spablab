import createGameDialogActionTypes from '../constants/dialog/createGameDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case createGameDialogActionTypes.CLOSE:
      return {
        ...initialState,
        open: false,
      };
    case createGameDialogActionTypes.OPEN:
      return {
        ...initialState,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
