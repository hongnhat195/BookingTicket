import * as ActionTypes from "./constants";
const initialState = {
  loading: false,
  data: null,
  err: null,
};
const postUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.POSTUSERREQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;
      return { ...state };
    case ActionTypes.POSTUSERSUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };
    case ActionTypes.POSTUSERFAIL:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default postUserReducer;
