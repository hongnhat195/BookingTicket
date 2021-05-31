import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
export default function ManageFilm(props) {
  const Token = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  const [movieList, setMovieList] = useState({ hits: [] });
  const [updateFilm, setUpdateFilm] = useState({
    maPhim: 0,
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: "",
    moTa: "",
    maNhom: "GP02",
    ngayKhoiChieu: "",
    danhGia: 0,
  });
  const [addFilmm, setAddFilmm] = useState({
    maPhim: 0,
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: "",
    moTa: "",
    maNhom: "GP02",
    ngayKhoiChieu: "",
    danhGia: 0,
  });
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = (item) => {
    setOpen(true);
    setUpdateFilm({
      maPhim: item.maPhim,
      tenPhim: item.tenPhim,
      biDanh: item.biDanh,
      trailer: item.trailer,
      hinhAnh: item.hinhAnh,
      moTa: item.moTa,
      maNhom: item.maNhom,
      ngayKhoiChieu: item.ngayKhoiChieu,
      danhGia: item.danhGia,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateFilm({ ...updateFilm, [name]: value });
  };
  const handleChange1 = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddFilmm({ ...addFilmm, [name]: value });
  };
  useEffect(() => {
    fetchMovieList();
  }, []);
  useEffect(() => {
    console.log(updateFilm);
  }, [updateFilm]);
  useEffect(() => {
    console.log(addFilmm);
  }, [addFilmm]);
  useEffect(() => {
    console.log(movieList);
  }, [movieList]);
  const fetchMovieList = async () => {
    const result = await axios
      .get(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP02  "
      )
      .then((res) => {
        setMovieList({
          hits: res.data,
        });
      });
  };
  const handleDelete = async (item) => {
    console.log(item);
    const res = await axios
      .delete(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${item}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((result) => {
        fetchMovieList();
        alert("xóa phim thành công");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const handleUpdate = async (item) => {
    const res = await axios
      .post(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim",
        updateFilm,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((result) => {
        fetchMovieList();
        alert("Cập Nhật thành công");
        handleClose();
      })
      .catch((err) => alert(err.response.data));
  };
  const handleAddFilm = async () => {
    const result = await axios
      .post(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim",
        addFilmm,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        fetchMovieList();
        alert("Thêm phim thành công");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  const handleUploadImage = async () => {};
  const showFilm = () => {
    if (movieList.hits) {
      return movieList.hits.map((item) => {
        return (
          <tr>
            <th scope="col">
              <img
                style={{
                  maxWidth: 70,
                  maxHeight: 200,
                }}
                src={item.hinhAnh}
              />
            </th>
            <th scope="col">{item.maPhim}</th>
            <th scope="col">{item.tenPhim}</th>
            <th scope="col">
              <button
                onClick={() => handleClickOpen(item)}
                class="btn btn-success mr-5"
              >
                Cập nhật film
              </button>
              <button
                onClick={() => handleDelete(item.maPhim)}
                class="btn btn-danger"
              >
                Xóa Phim
              </button>
            </th>
          </tr>
        );
      });
    }
  };
  return (
    <div>
      <h1 className="mb-5 mt-5">Danh sách Film</h1>
      <button onClick={handleClickOpen1} className="btn btn-success mb-5">
        Thêm Phim Mới
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Mã Phim</th>
            <th scope="col">Tên Phim</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>{showFilm()}</tbody>
      </table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thông tin cập nhật phim, mã nhóm phim mặc định là GP02
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="maPhim"
            label="Mã Phim"
            defaultValue={updateFilm.maPhim}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="tenPhim"
            label="Tên Phim"
            defaultValue={updateFilm.tenPhim}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="biDanh"
            label="Bí Danh"
            defaultValue={updateFilm.biDanh}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Trailer"
            name="trailer"
            defaultValue={updateFilm.trailer}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            name="hinhAnh"
            label="Hình Ảnh "
            defaultValue={updateFilm.hinhAnh}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="moTa"
            label="Mô tả"
            defaultValue={updateFilm.moTa}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            name="maNhom"
            label="Mã nhóm"
            defaultValue={updateFilm.maNhom}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="ngayKhoiChieu"
            label="Ngày khởi chiếu"
            defaultValue={updateFilm.ngayKhoiChieu}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="danhGia"
            label="Đánh giá"
            defaultValue={updateFilm.danhGia}
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Cập nhật Phim
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
            Nhập thông tin về phim mới, mã nhóm phim mặc định là GP02
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="maPhim"
            label="Mã Phim"
            defaultValue={addFilmm.maPhim}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="tenPhim"
            label="Tên Phim"
            defaultValue={addFilmm.tenPhim}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="biDanh"
            label="Bí Danh"
            defaultValue={addFilmm.biDanh}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Trailer"
            name="trailer"
            defaultValue={addFilmm.trailer}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="hinhAnh"
            label="Hình Ảnh "
            defaultValue={addFilmm.hinhAnh}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="moTa"
            label="Mô tả"
            defaultValue={addFilmm.moTa}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            name="maNhom"
            label="Mã nhóm"
            defaultValue={addFilmm.maNhom}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="ngayKhoiChieu"
            label="Ngày khởi chiếu"
            defaultValue={addFilmm.ngayKhoiChieu}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="danhGia"
            label="Đánh giá"
            defaultValue={addFilmm.danhGia}
            fullWidth
            onChange={handleChange1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFilm} color="primary">
            Thêm phim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
