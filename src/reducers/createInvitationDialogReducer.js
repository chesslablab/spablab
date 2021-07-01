import createInvitationDialogActionTypes from '../constants/createInvitationDialogActionTypes';

const initialState = {
  open: false,
  color: 'rand',
  time: 10,
  code: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case createInvitationDialogActionTypes.CLOSE:
      return {
        ...initialState,
        open: false,
      };
    case createInvitationDialogActionTypes.OPEN:
      return {
        ...initialState,
        open: true,
      };
    case createInvitationDialogActionTypes.CREATE_CODE:
      return {
        ...state,
        color: action.payload.color,
        time: action.payload.time,
        code: action.payload.code,
      };
    default:
      return state;
  }
};

export default reducer;
