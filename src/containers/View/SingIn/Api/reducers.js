import * as ActionTypes from "./constants";
const initialState = {
  loading: false,
  data: null,
  err: null,
  login: false,
};
const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      state.login = false;
      return { ...state };
    case ActionTypes.LOGIN_USER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      state.login = true;
      return { ...state };
    case ActionTypes.LOGIN_USER_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      state.login = false;
      return { ...state };
    case ActionTypes.LOGOUT:
      state.loading = false;
      state.data = null;
      state.err = null;
      state.login = false;
      return { ...state };
    default:
      return { ...state };
  }
};
export default loginUserReducer;
