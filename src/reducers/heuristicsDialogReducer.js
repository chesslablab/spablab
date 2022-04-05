import heuristicsDialogActionTypes from '../constants/dialog/heuristicsDialogActionTypes';

const initialState = {
  open: false,
  heuristics: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case heuristicsDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
        heuristics: null,
      };
    case heuristicsDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
        heuristics: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
