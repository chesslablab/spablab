import heuristicPictureDialogActionTypes from '../constants/dialog/heuristicPictureDialogActionTypes';

const initialState = {
  open: false,
  heuristics: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case heuristicPictureDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
        heuristics: null,
      };
    case heuristicPictureDialogActionTypes.OPEN:
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
