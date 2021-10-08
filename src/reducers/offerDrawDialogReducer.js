import offerDrawDialogActionTypes from '../constants/offerDrawDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case offerDrawDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case offerDrawDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
