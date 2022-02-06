import takebackOfferDialogActionTypes from '../constants/dialog/takebackOfferDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case takebackOfferDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case takebackOfferDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
