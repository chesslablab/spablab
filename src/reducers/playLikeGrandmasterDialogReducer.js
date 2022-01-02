import playLikeGrandmasterDialogActionTypes from '../constants/playLikeGrandmasterDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case playLikeGrandmasterDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case playLikeGrandmasterDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
