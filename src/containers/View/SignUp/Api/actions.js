import * as ActionTypes from "./constants";
import axios from "axios";
import Swal from "sweetalert2";

export const FetchSignUp = (user, history) => {
  return (dispatch) => {
    dispatch(actAuthRequest());
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      method: "POST",
      data: user,
    })
      .then((res) => {
        dispatch(actAuthSuccess(res.data));
        localStorage.setItem("User", JSON.stringify(res.data));

        return Swal.fire({
          //position: 'mid',
          icon: "success",
          title: "Đăng Kí thành công",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => history.push("./"));
      })
      .catch((err) => {
        dispatch(actAutFail(err));
        console.log(err, 1);

        return Swal.fire({
          icon: "error",
          title: err.response.data,
          text: "no",
          timer: 2000,
        });
      });
  };
};
const actAuthRequest = () => {
  return {
    type: ActionTypes.SIGNUP_REQUEST,
  };
};
const actAuthSuccess = (data) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    payload: data,
  };
};
const actAutFail = (err) => {
  return {
    type: ActionTypes.SIGNUP_FAIL,
    payload: err,
  };
};
