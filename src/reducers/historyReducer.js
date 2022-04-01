import historyActionTypes from '../constants/historyActionTypes';

const initialState = {
  back: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case historyActionTypes.GO_TO:
      return {
        back: 0 - action.payload.back
      };
    case historyActionTypes.GO_BACK:
      return {
        back: state.back - 1,
      };
    case historyActionTypes.GO_FORWARD:
      return {
        back: state.back + 1,
      };
    case historyActionTypes.GO_TO_END:
      return {
        back: 0
      };
    default:
      return state;
  }
};

export default reducer;
