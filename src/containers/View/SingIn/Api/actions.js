import * as actionTypes from "./constants";
import Swal from "sweetalert2";
import axios from "axios";
let login = false;
const renderNoti = (login) => {
  if (!login) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tài khoản hoặc mật khẩu không đúng!",
      footer: "<a href>Why do I have this issue?</a>",
    });
  } else if (login) {
    return Swal.fire({
      //position: 'mid',
      icon: "success",
      title: "Đăng Nhập thành công",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};
export const clearLogin = () => {
  return (dispatch) => {
    dispatch(actLogOut());
  };
};
export const actLoginUserApi = (user, history) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data: user,
    })
      .then((result) => {
        dispatch(actLoginSuccess(result.data));
        login = true;
        renderNoti(login);
        setTimeout(() => {
          if (result.data.maLoaiNguoiDung === "KhachHang") {
            localStorage.clear();
            localStorage.setItem("User", JSON.stringify(result.data));
            //localStorage.setItem("User", JSON.stringify(result.data));
            history.push("/");
          } else if (result.data.maLoaiNguoiDung === "QuanTri") {
            localStorage.clear();
            localStorage.setItem("UserAdmin", JSON.stringify(result.data));
            history.push("/Db");
          }
        }, 2000);
      })
      .catch((err) => {
        dispatch(actLoginFail(err));
        login = false;
        renderNoti(login);
      });
  };
};

const actLoginRequest = () => {
  return {
    type: actionTypes.LOGIN_USER_REQUEST,
  };
};
const actLoginSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    payload: data,
  };
};
const actLoginFail = (err) => {
  return {
    type: actionTypes.LOGIN_USER_FAILED,
    payload: err,
  };
};
const actLogOut = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
