import * as ActionTypes from "./constants";
const initialState = {
  loading: false,
  data: null,
  err: null,
};
const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGNUP_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case ActionTypes.SIGNUP_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };
    case ActionTypes.SIGNUP_FAIL:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    default:
      return state;
  }
};
export default SignUpReducer;
