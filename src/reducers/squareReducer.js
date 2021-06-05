import squareActionTypes from 'constants/squareActionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case squareActionTypes.CLICK:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
