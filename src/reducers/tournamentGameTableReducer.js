import tournamentGameTableActionTypes from '../constants/tournamentGameTableActionTypes';

const initialState = {
  rows: [],
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case tournamentGameTableActionTypes.DISPLAY:
      return {
        rows: action.payload.rows,
        open: true
      };
    case tournamentGameTableActionTypes.CLOSE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
