import heuristicsBarActionTypes from '../constants/heuristicsBarActionTypes';

const initialState = {
  heuristics: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case heuristicsBarActionTypes.RESET:
      return initialState;
    case heuristicsBarActionTypes.UPDATE:
      return {
        ...state,
        heuristics: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
