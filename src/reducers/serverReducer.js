import serverActionTypes from 'constants/serverActionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case serverActionTypes.CONNECT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
