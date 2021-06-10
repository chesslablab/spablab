import serverActionTypes from '../constants/serverActionTypes';

const initialState = {
  ws: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case serverActionTypes.CONNECTION_ESTABLISHED:
      return {
        ...state,
        ws: action.payload.ws
      };
    case serverActionTypes.CONNECTION_CLOSED:
      return {
        ...state,
        ws: null
      };
    case serverActionTypes.CONNECTION_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
