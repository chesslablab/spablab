import gameTableActionTypes from '../constants/table/gameTableActionTypes';

const initialState = {
  game: {},
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case gameTableActionTypes.DISPLAY:
      return {
        game: action.payload.game,
        open: true
      };
    case gameTableActionTypes.CLOSE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
