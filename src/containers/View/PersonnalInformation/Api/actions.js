import * as actionTypes from "./constants";
import Swal from "sweetalert2";
import axios from "axios";
export const actPostUserApi = (user) => {
  return (dispatch) => {
    dispatch(actPostRequest());
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      method: "POST",
      data: user,
    })
      .then((result) => {
        dispatch(actPostSuccess(result.data));
        localStorage.setItem("User1", JSON.stringify(result.data));
        console.log("result", result.data);
      })
      .catch((error) => {
        dispatch(actPostFail(error));
      });
  };
};
const actPostRequest = () => {
  return {
    type: actionTypes.POSTUSERREQUEST,
  };
};
const actPostSuccess = (data) => {
  return {
    type: actionTypes.POSTUSERSUCCESS,
    payload: data,
  };
};
const actPostFail = (err) => {
  return {
    type: actionTypes.POSTUSERFAIL,
    payload: err,
  };
};
