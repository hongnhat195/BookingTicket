import axios from "axios";
import {
  FETCH_MOIVE,
  FETCH_MOVIEDETAIL,
  GETTHEATER,
  GETTHEATERCOURSE,
  GETTHEATERDETAIL,
} from "../Constant/course";
export const fetchMovieList = () => {
  return (dispatch) => {
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP02",
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: FETCH_MOIVE,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const fetchMovieDetail = (id) => {
  return (dispatch) => {
    axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: FETCH_MOVIEDETAIL,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const fetGetTheaterCourse = () => {
  return (dispatch) => {
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: GETTHEATERCOURSE,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
export const fetGetTheaterDetail = (maHeThongRap) => {
  return (dispatch) => {
    axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: GETTHEATERDETAIL,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
export const fetGetTheater = (maHeThongRap) => {
  return (dispatch) => {
    axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${maHeThongRap}`,
      method: "GET",
    })
      .then((res) => {
        console.log("theater", res.data);
        dispatch({
          type: GETTHEATER,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
