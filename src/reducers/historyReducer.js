import historyActionTypes from 'constants/historyActionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case historyActionTypes.GO_TO_BEGINNING:
      return {
        ...state,
      };
    case historyActionTypes.GO_BACK:
      return {
        ...state,
      };
    case historyActionTypes.GO_FORWARD:
      return {
        ...state,
      };
    case historyActionTypes.GO_TO_END:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
