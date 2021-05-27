import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
export default function MovieSchedule(props) {
  const [state, setState] = useState({
    danhSachGhe: [],
    thongTinPhim: [],
  });
  console.log("pr", props);

  const handleClickOpen = () => {
    if (!localStorage.getItem("User")) {
      handle();
    } else {
      if (state.danhSachGhe) {
        props.onSetState(state.danhSachGhe, state.thongTinPhim);
      }
    }
  };
  const getRoomTicket = async () => {
    const res = await axios.get(
      `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${props.data.maLichChieu}`
    );
    const result = res.data;
    setState({
      danhSachGhe: res.data.danhSachGhe,
      thongTinPhim: res.data.thongTinPhim,
    });
    return res.data;
  };
  useEffect(() => {
    getRoomTicket();
  }, []);
  async function handle() {
    const { value: formValues } = await Swal.fire({
      title: "Đăng Nhập",
      html:
        '<input id="swal-input1" placeholder="Tài Khoản" class="swal2-input">' +
        '<input type= "password" placeholder="Mật Khẩu" id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const taiKhoan = formValues[0];
      const matKhau = formValues[1];
      const state = {
        taiKhoan: taiKhoan,
        matKhau: matKhau,
      };

      const result = await axios.post(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        state
      );
      if (result.data != null) {
        console.log("ok");
        localStorage.clear();
        localStorage.setItem("User", JSON.stringify(result.data));
        return Swal.fire({
          icon: "success",
          title: "Oops...",
          text: "Đăng Nhập thành công!",
          footer: "<a href>Why do I have this issue?</a>",
        });
      } else {
        console.log("no");
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tài khoản hoặc mật khẩu không đúng!",
          footer: "<a href>Why do I have this issue?</a>",
        });
      }
    }
  }
  return (
    <div>
      <button onClick={handleClickOpen} className="btn btn-danger m-3">
        {props.data.tenRap} - {props.data.ngayChieuGioChieu}
      </button>
    </div>
  );
}
