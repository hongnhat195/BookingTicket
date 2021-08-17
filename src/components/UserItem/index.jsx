import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";
export default function UserItem(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    taiKhoan: props.data.taiKhoan,
    matKhau: props.data.matKhau,
    email: props.data.email,
    soDt: props.data.soDt,
    maNhom: "GP02",
    maLoaiNguoiDung: "KhachHang",
    hoTen: props.data.hoTen,
  });
  const [state1, setState1] = useState({
    taiKhoan: props.data.taiKhoan,
    matKhau: props.data.matKhau,
    email: props.data.email,
    soDt: props.data.soDt,
    maNhom: "GP02",
    maLoaiNguoiDung: "KhachHang",
    hoTen: props.data.hoTen,
  });
  const a = state.soDt == null ? state.soDT : state.soDt;
  const Token = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState1({ ...state1, [name]: value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putUserInfo(state1);
  };
  const putUserInfo = async (user) => {
    await axios
      .put(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        user,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        setState(res.data);
        alert("Cập Nhật thành công");
        handleClose();
      })
      .catch((err) => {
        alert(err.response.data);
      });

  
  };
  const DeleteUser = async (i) => {
 await axios
      .delete(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${i}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        alert("Xóa thành công");
        setState1(null);
        getListUser();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  };
  const getListUser = async () => {
    const res = await axios.get(
      "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02"
    );
    props.onSetUser(res.data);
  };

  if (state1 != null) {
    return (
      <tr>
        <td>{state.taiKhoan}</td>
        <td> {state.matKhau} </td>
        <td>{state.hoTen} </td>
        <td>{state.email} </td>
        <td>{a}</td>
        <td>
          <button onClick={handleClickOpen} className="btn btn-primary ">
            Cập Nhật
          </button>
          <button
            onClick={() => DeleteUser(props.data.taiKhoan)}
            className="btn btn-danger ml-4 mr-4"
          >
            Xóa
          </button>
        </td>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="taiKhoan"
              label="Tài Khoản"
              type="email"
              fullWidth
              defaultValue={state1.taiKhoan}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="matKhau"
              label="Mật kHẩu"
              fullWidth
              defaultValue={state1.matKhau}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="hoTen"
              label="Họ Tên"
              fullWidth
              defaultValue={state1.hoTen}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="soDt"
              label="Số điện thoại"
              type="email"
              fullWidth
              defaultValue={state1.soDt}
              onChange={handleChange}
            />
            <TextField
              disabled
              autoFocus
              margin="dense"
              name="maLoaiNguoiDung"
              label="Mã loại người dùng"
              type="email"
              fullWidth
              defaultValue={state1.maLoaiNguoiDung}
              onChange={handleChange}
            />
            <TextField
              disabled
              autoFocus
              margin="dense"
              name="maNhom"
              label="maNhom"
              type="email"
              fullWidth
              defaultValue="GP02"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              defaultValue={state1.email}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </tr>
    );
  } else {
    return null;
  }
}
