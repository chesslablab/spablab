import boardActionTypes from 'constants/boardActionTypes';
import { ascii } from 'utils/Pieces';

const initialState = {
  ascii: ascii
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case boardActionTypes.RESET:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
