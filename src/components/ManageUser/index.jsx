import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
export default function ManageUser() {
  const Token = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [userList, setUserList] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [updateUser, setUpdateUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP02",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const [addUser, setAddUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP02",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const handleClickOpen = (item) => {
    console.log(item);
    setOpen(true);
    setUpdateUser({
      taiKhoan: item.taiKhoan,
      matKhau: item.matKhau,
      email: item.email,
      maLoaiNguoiDung: item.maLoaiNguoiDung,
      hoTen: item.hoTen,
      soDt: item.soDt,
      maNhom: "GP02",
    });
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const fetUserList = async () => {
    await axios
      .get(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02"
      )
      .then((res) => {
        setUserList({
          hits: res.data,
        });
      })
      .catch((err) => console.error(err));
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };
  const handleChange1 = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };
  const handleUpdate = async () => {
    await axios
      .put(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        updateUser,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        fetUserList();
        alert("C???p nh???t th??nh c??ng");
        handleClose();
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  const handleDelete = async (item) => {
    console.log(item);
    await axios
      .delete(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${item}`,

        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        fetUserList();
        alert("X??a ng?????i d??ng th??nh c??ng");
      })
      .catch((err) => alert(err.response.data));
  };
  const handleAddUser = async () => {
    await axios
      .post(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
        addUser,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        fetUserList();
        alert("Th??m ng?????i d??ng th??nh c??ng");
      })
      .catch((err) => alert(err.response.data));
  };
  useEffect(() => {
    fetUserList();
  }, []);
  useEffect(() => {
    console.log(updateUser);
  }, [updateUser]);
  useEffect(() => {
    console.log(userList);
  }, [userList]);
  useEffect(() => {
    console.log(addUser);
  }, [addUser]);
  const showUserList = () => {
    if (userList.hits) {
      return userList.hits.map((item) => {
        return (
          <tr>
            <th scope="col"> {item.taiKhoan} </th>
            <th scope="col">{item.matKhau} </th>
            <th scope="col">{item.hoTen} </th>
            <th scope="col">{item.email}</th>
            <th scope="col">{item.soDt}</th>
            <th>
              <button
                onClick={() => handleClickOpen(item)}
                class="btn btn-primary mr-3"
              >
                C???p nh???t
              </button>
              <button
                onClick={() => handleDelete(item.taiKhoan)}
                class="btn btn-danger"
              >
                X??a
              </button>
            </th>
          </tr>
        );
      });
    }
  };
  useEffect(() => {
    const fetFindUser = async () => {
      await axios
        .get(
          `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02&tuKhoa=${query}`
        )
        .then((res) => {
          setUserList({
            hits: res.data,
          });
        });
    };
    if (query != "") fetFindUser();
    else fetUserList();
  }, [query]);
  return (
    <div>
      <h1 className="mt-5 mb-5">Danh s??ch ng?????i d??ng</h1>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search username"
          aria-label="Recipient's username with two button addons"
          aria-describedby="button-addon4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <button onClick={handleClickOpen1} className="btn btn-success  mb-2">
        Th??m ng?????i d??ng
      </button>
      <table className="table">
        <thead>
          <tr>
            <td>T??i kho???n</td>
            <td>M???t kh???u</td>
            <td>H??? t??n</td>
            <td>Email</td>
            <td>S??? ??T</td>
            <td>T??y ch???nh</td>
          </tr>
        </thead>
        <tbody>{showUserList()}</tbody>
      </table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="taiKhoan"
            label="T??i kho???n"
            value={updateUser.taiKhoan}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="matKhau"
            label="M???t kh???u"
            value={updateUser.matKhau}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            value={updateUser.email}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="soDt"
            label="S??? ??i???n tho???i"
            value={updateUser.soDt}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="hoTen"
            label="H??? t??n"
            value={updateUser.hoTen}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            name="maNhom"
            label="M?? Nh??m"
            value="GP02"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="maLoaiNguoiDung"
            label="M?? lo???i ng?????i d??ng (khachHang ho???c quanTri)"
            value={updateUser.maLoaiNguoiDung}
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            H???y b???
          </Button>
          <Button onClick={handleUpdate} color="primary">
            C???p nh???t ng?????i d??ng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="taiKhoan"
            label="T??i kho???n"
            value={addUser.taiKhoan}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="matKhau"
            label="M???t kh???u"
            value={addUser.matKhau}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            value={addUser.email}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="soDt"
            label="S??? ??i???n tho???i"
            value={addUser.soDt}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="hoTen"
            label="H??? t??n"
            value={addUser.hoTen}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            name="maNhom"
            label="M?? Nh??m"
            value="GP02"
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="maLoaiNguoiDung"
            label="M?? lo???i ng?????i d??ng (khachHang ho???c quanTri)"
            value={addUser.maLoaiNguoiDung}
            fullWidth
            onChange={handleChange1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            H???y b???
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Th??m ng?????i d??ng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
