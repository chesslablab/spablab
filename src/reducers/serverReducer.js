import serverActionTypes from '../constants/serverActionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case serverActionTypes.ANALYSIS:
      return {
        ...state,
      };
    case serverActionTypes.CONNECT:
      return {
        ...state,
      };
    case serverActionTypes.PLAY_AI:
      return {
        ...state,
      };
    case serverActionTypes.PLAY_FRIEND:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
