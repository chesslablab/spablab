import historyActionTypes from '../constants/historyActionTypes';

const initialState = {
  back: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case historyActionTypes.GO_TO_BEGINNING:
      return {
        ...state,
        back: 0 - action.payload.back
      };
    case historyActionTypes.GO_BACK:
      return {
        ...state,
        back: state.back - 1,
      };
    case historyActionTypes.GO_FORWARD:
      return {
        ...state,
        back: state.back + 1,
      };
    case historyActionTypes.GO_TO_END:
      return {
        ...state,
        back: 0
      };
    default:
      return state;
  }
};

export default reducer;
