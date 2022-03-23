import tournamentGameTableActionTypes from '../constants/table/tournamentGameTableActionTypes';

const initialState = {
  game: {},
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case tournamentGameTableActionTypes.DISPLAY:
      return {
        game: action.payload.game,
        open: true
      };
    case tournamentGameTableActionTypes.CLOSE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
