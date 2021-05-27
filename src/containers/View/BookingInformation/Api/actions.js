import axios from "axios";
import { GETFILMSHOW } from "./constants";
export const fetchGetFilmShow = (id) => {
  return (dispatch) => {
    axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GETFILMSHOW,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
