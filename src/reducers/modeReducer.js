import modeActionTypes from '../constants/modeActionTypes';

const initialState = {
  name: 'analysis',
  color: null,
  time: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case modeActionTypes.RESET:
      return initialState;
    case modeActionTypes.SET:
      return {
        ...state,
        name: action.payload.name,
        color: action.payload.color,
        time: action.payload.time
      };
    default:
      return state;
  }
};

export default reducer;
