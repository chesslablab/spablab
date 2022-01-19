import ecoOpeningsDialogActionTypes from '../constants/ecoOpeningsDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ecoOpeningsDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case ecoOpeningsDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
