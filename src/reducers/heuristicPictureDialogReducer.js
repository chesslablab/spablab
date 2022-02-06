import heuristicPictureDialogActionTypes from '../constants/dialog/heuristicPictureDialogActionTypes';

const initialState = {
  open: false,
  heuristic_picture: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case heuristicPictureDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
        heuristic_picture: null,
      };
    case heuristicPictureDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
        heuristic_picture: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
