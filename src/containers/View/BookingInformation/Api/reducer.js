import { GETFILMSHOW } from "./constants";
const initialState = {
  infoShowfilm: [],
};
const getFilmShow = (state = initialState, action) => {
  switch (action.type) {
    case GETFILMSHOW:
      state.infoShowfilm = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default getFilmShow;
