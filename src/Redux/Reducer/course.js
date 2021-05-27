import {
  FETCH_MOIVE,
  FETCH_MOVIEDETAIL,
  GETTHEATERCOURSE,
  GETTHEATERDETAIL,
  GETTHEATER,
} from "../Constant/course";

const initialState = {
  movieList: [],
  movieDetail: [],
  infoTheaterCourse: [],
  infoTheaterDetail: [],
  infoTheater: [],
};
const reducer1 = (state = initialState, { type, payload, ...action }) => {
  switch (type) {
    case FETCH_MOIVE:
      state.movieList = payload;
      return { ...state };
    case FETCH_MOVIEDETAIL:
      state.movieDetail = payload;
      return { ...state };
    case GETTHEATERCOURSE:
      state.infoTheaterCourse = payload;
      return { ...state };
    case GETTHEATERDETAIL:
      state.infoTheaterDetail = payload;
      return { ...state };
    case GETTHEATER:
      state.infoTheater = payload;
      return { ...state };
    default:
      return state;
  }
};
export default reducer1;
