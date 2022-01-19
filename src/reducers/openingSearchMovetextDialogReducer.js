import openingSearchMovetextDialogActionTypes from '../constants/openingSearchMovetextDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case openingSearchMovetextDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case openingSearchMovetextDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
