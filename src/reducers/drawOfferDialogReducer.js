import drawOfferDialogActionTypes from '../constants/dialog/drawOfferDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case drawOfferDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case drawOfferDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
