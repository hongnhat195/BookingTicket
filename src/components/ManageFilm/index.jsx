import React, { useState, useEffect } from "react";
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
  const [query, setQuery] = React.useState("");
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
  useEffect(() => {
    const fetFindFilm = async () => {
      await axios
        .get(
          `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP02&tenPhim=${query}`
        )
        .then((res) => {
          setMovieList({
            hits: res.data,
          });
        });
    };
    if (query != "") fetFindFilm();
    else fetchMovieList();
  }, [query]);
  const fetchMovieList = async () => {
    await axios
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
   
     await axios
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
        alert("x??a phim th??nh c??ng");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const handleUpdate = async () => {
    await axios
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
        alert("C???p Nh???t th??nh c??ng");
        handleClose();
      })
      .catch((err) => alert(err.response.data));
  };
  const handleAddFilm = async () => {
    await axios
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
        alert("Th??m phim th??nh c??ng");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  const showFilm = () => {
    if (movieList.hits) {
      return movieList.hits.map((item) => {
        return (
          <tr>
            <th scope="col">
              <img  src={item.hinhAnh} alt={item.hinhAnh} style={{
                  maxWidth: 70,
                  maxHeight: 200,
                }}
               
              />
            </th>
            <th scope="col">{item.maPhim}</th>
            <th scope="col">{item.tenPhim}</th>
            <th scope="col">
              <button
                onClick={() => handleClickOpen(item)}
                class="btn btn-success mr-5"
              >
                C???p nh???t film
              </button>
              <button
                onClick={() => handleDelete(item.maPhim)}
                class="btn btn-danger"
              >
                X??a Phim
              </button>
            </th>
          </tr>
        );
      });
    }
  };
  return (
    <div>
      <h1 className="mb-5 mt-5">Danh s??ch Film</h1>
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
      <button onClick={handleClickOpen1} className="btn btn-success mb-5">
        Th??m Phim M???i
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">H??nh ???nh</th>
            <th scope="col">M?? Phim</th>
            <th scope="col">T??n Phim</th>
            <th scope="col">Thao t??c</th>
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
            Th??ng tin c???p nh???t phim, m?? nh??m phim m???c ?????nh l?? GP02
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="maPhim"
            label="M?? Phim"
            defaultValue={updateFilm.maPhim}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="tenPhim"
            label="T??n Phim"
            defaultValue={updateFilm.tenPhim}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="biDanh"
            label="B?? Danh"
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
            label="H??nh ???nh "
            defaultValue={updateFilm.hinhAnh}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="moTa"
            label="M?? t???"
            defaultValue={updateFilm.moTa}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            name="maNhom"
            label="M?? nh??m"
            defaultValue={updateFilm.maNhom}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="ngayKhoiChieu"
            label="Ng??y kh???i chi???u"
            defaultValue={updateFilm.ngayKhoiChieu}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="danhGia"
            label="????nh gi??"
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
            C???p nh???t Phim
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
            Nh???p th??ng tin v??? phim m???i, m?? nh??m phim m???c ?????nh l?? GP02
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="maPhim"
            label="M?? Phim"
            defaultValue={addFilmm.maPhim}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="tenPhim"
            label="T??n Phim"
            defaultValue={addFilmm.tenPhim}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="biDanh"
            label="B?? Danh"
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
            label="H??nh ???nh "
            defaultValue={addFilmm.hinhAnh}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="moTa"
            label="M?? t???"
            defaultValue={addFilmm.moTa}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            name="maNhom"
            label="M?? nh??m"
            defaultValue={addFilmm.maNhom}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="ngayKhoiChieu"
            label="Ng??y kh???i chi???u"
            defaultValue={addFilmm.ngayKhoiChieu}
            fullWidth
            onChange={handleChange1}
          />
          <TextField
            autoFocus
            margin="dense"
            name="danhGia"
            label="????nh gi??"
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
            Th??m phim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
