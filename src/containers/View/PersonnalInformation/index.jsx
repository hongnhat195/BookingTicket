import React, { useState, useDispatch, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";
import "./style.css";

import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

function Personal() {
  const classes = useStyles();
  const user1 = JSON.parse(localStorage.getItem("User"));
  const Token = JSON.parse(localStorage.getItem("User")).accessToken;
  console.log(Token);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(user1);
  const [bookingTicket, setBookingTicket] = useState([]);
  const [state, setState] = useState({
    taiKhoan: user.taiKhoan,
    matKhau: user.matKhau,
    email: user.email,
    soDT: user.soDT,
    maNhom: user.maNhom,
    maLoaiNguoiDung: "KhachHang",
    hoTen: user.hoTen,
  });

  console.log("state", state);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putUserInfo(state);
  };

  const putUserInfo = async (user) => {
    const result = await axios.put(
      "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      user,
      { headers: { Authorization: `Bearer ${Token}` } }
    );
    setUser(user);
    handleClose();
    Swal.fire("Cập Nhật thành công", "You clicked the button!", "success");
    console.log("result", result);
  };

  useEffect(() => {
    async function fetchUserInfo() {
      const result = await axios.post(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        user
      );
      console.log(result);
      setUser(result.data);
      setState({
        taiKhoan: user.taiKhoan,
        matKhau: user.matKhau,
        email: user.email,
        soDT: user.soDT,
        maNhom: user.maNhom,
        maLoaiNguoiDung: "KhachHang",
        hoTen: user.hoTen,
      });
      setBookingTicket(result.thongTinDatVe);
    }
    fetchUserInfo();
    console.log("user", user);
  }, [open]);

  return (
    <div className="container info">
      <h1>MY ACCOUNT INFOMATION</h1>
      <div>
        <TextField
          disabled
          label="Tài Khoản"
          name="taiKhoan"
          style={{ margin: 20, width: "80%" }}
          value={state.taiKhoan}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          disabled
          label="Họ Tên"
          name="hoTen"
          style={{ margin: 20, width: "80%" }}
          value={state.hoTen}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          disabled
          label="Email"
          name="email"
          style={{ margin: 20, width: "80%" }}
          value={state.email}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          disabled
          label="Số Điện Thoại"
          name="soDT"
          style={{ margin: 20, width: "80%" }}
          value={state.soDT}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          disabled
          label="Mã nhóm"
          name="maNhom"
          style={{ margin: 20, width: "80%" }}
          value={state.maNhom}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          disabled
          label="Mã loại người dùng"
          name="maLoaiNguoiDung"
          style={{ margin: 20, width: "80%" }}
          value={state.maLoaiNguoiDung}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <div>
        <Button
          style={{ margin: "20px" }}
          variant="outlined"
          color="secondary"
          onClick={handleClickOpen}
          // onClick={handleClickOpen}
        >
          Change Infomation
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Chi tiết</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                label="Tài Khoản"
                name="taiKhoan"
                style={{ margin: 20, width: "80%" }}
                defaultValue={user.taiKhoan}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
                className={classes.textField}
              />
              <TextField
                label="Mật Khẩu"
                name="matKhau"
                style={{ margin: 20, width: "80%" }}
                type="password"
                defaultValue={user.matKhau}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
                className={classes.textField}
              />
              <TextField
                label="Họ Tên"
                style={{ margin: 20, width: "80%" }}
                defaultValue={user.hoTen}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
                name="hoTen"
              />
              <TextField
                label="Email"
                style={{ margin: 20, width: "80%" }}
                defaultValue={user.email}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
                name="email"
              />
              <TextField
                label="Số Điện Thoại"
                style={{ margin: 20, width: "80%" }}
                defaultValue={user.soDT}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
                name="soDT"
              />
              <TextField
                label="Mã nhóm"
                style={{ margin: 20, width: "80%" }}
                defaultValue={user.maNhom}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
                name="maNhom"
              />
              <TextField
                disabled
                label="Mã loại người dùng"
                style={{ margin: 20, width: "80%" }}
                defaultValue="KhachHang"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChange}
                name="maLoaiNguoiDung"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div></div>
    </div>
  );
}

export default Personal;
