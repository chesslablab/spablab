import wsActionTypes from '../constants/wsActionTypes';

const initialState = {
  ws: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case wsActionTypes.CONNECTION_ESTABLISHED:
      return {
        ...state,
        ws: action.payload.ws
      };
    case wsActionTypes.CONNECTION_CLOSED:
      return {
        ...state,
        ws: null
      };
    case wsActionTypes.CONNECTION_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
