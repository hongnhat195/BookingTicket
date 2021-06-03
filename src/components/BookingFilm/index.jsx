import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
export default function BookingFilm(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [theaterList, setTheaterList] = useState({ hits: [] });
  const [theaterDetail, setTheaterDetail] = useState({ hits: [] });
  const [lichChieu, setLichChieu] = useState({ hits: [], maCumRap: "" });
  const [listSeat, setListSeat] = useState({ hits: [], thongTinPhim: {} });
  const [seatItem, setSeatItem] = useState({ hits: {} });

  console.log(lichChieu.hits, "hhuhu");
  const handleClickOpen = (scrollType, item) => () => {
    fetMaRap(item);
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
    setSeatItem({
      hits: {},
    });
  };
  const descriptionElementRef = React.useRef(null);

  const fetLichChieu = async (item) => {
    const res = await axios
      .get(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${props.value}`
      )
      .then((res) => {
        console.log("lichChieu", res.data.lichChieu);
        setLichChieu({
          hits: res.data.lichChieu,
          maCumRap: item,
        });
      })
      .catch((err) => console.log(err));
  };
  const fetListTheater = async () => {
    const result = await axios
      .get(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap"
      )
      .then((res) => {
        setTheaterList({
          hits: res.data,
        });
      });
  };
  const fetTheaterDetail = async (item) => {
    const result = await axios(
      `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${item}&maNhom=GP02`
    ).then((res) => {
      setLichChieu({
        hits: [],
      });
      setTheaterDetail({
        hits: res.data[0].lstCumRap,
      });
    });
  };
  const fetMaRap = async (item) => {
    const res = await axios
      .get(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${item}`
      )
      .then((res) => {
        console.log("res1", res.data);
        setListSeat({
          hits: res.data.danhSachGhe,
          thongTinPhim: res.data.thongTinPhim,
        });
      })
      .catch((err) => console.error(err));
  };
  const showListTheater = () => {
    if (theaterList.hits) {
      return theaterList.hits.map((item) => {
        return (
          <button
            onClick={() => fetTheaterDetail(item.maHeThongRap)}
            className="btn btn-primary m-2"
          >
            {item.tenHeThongRap}
          </button>
        );
      });
    }
  };
  const showTheaterDetail = () => {
    if (theaterDetail.hits != []) {
      console.log(theaterDetail.hits);
      return theaterDetail.hits.map((item) => {
        return (
          <button
            onClick={() => fetLichChieu(item.maCumRap)}
            className=" btn btn-danger m-2"
          >
            {item.tenCumRap}
          </button>
        );
      });
    } else console.log("dm");
  };
  const showLichChieu = () => {
    const a = lichChieu.hits.filter(
      (item) => item.thongTinRap.maCumRap == lichChieu.maCumRap
    );

    const b = a.map((item) => {
      return (
        <button
          onClick={handleClickOpen("paper", item.maLichChieu)}
          className="m-2 btn btn-warning"
        >
          <p> {item.thongTinRap.tenRap} </p>
          <p> {new Date(item.ngayChieuGioChieu).toLocaleString()} </p>
        </button>
      );
    });
    console.log("b", b);
    if (b.length == 0) return <p className="m-5"> Không có lịch chiếu</p>;
    else return b;
  };
  const showListSeat = () => {
    if (listSeat.hits) {
      return listSeat.hits.map((item) => {
        return (
          <button
            style={{
              width: 250,
            }}
            onClick={() =>
              setSeatItem({
                hits: item,
              })
            }
            disabled={item.daDat}
            className=" btn btn-info m-2"
          >
            <p> Ghế số: {item.tenGhe} </p>
            <p> Loại ghế: {item.loaiGhe == "Thuong" ? "Thường" : "Vip"} </p>
            <p> Giá vé: {item.giaVe} vnđ </p>
            <p> Trạng thái: {item.daDat == false ? "Chưa đặt" : "Đã đặt"} </p>
          </button>
        );
      });
    }
  };
  const fetBooking = async () => {
    const a = {
      maLichChieu: listSeat.thongTinPhim.maLichChieu,
      danhSachVe: [
        {
          maGhe: seatItem.hits.maGhe,
          giaVe: seatItem.hits.giaVe,
        },
      ],
      taiKhoanNguoiDung: JSON.parse(localStorage.getItem("User")).taiKhoan,
    };

    const res = axios
      .post("https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe", a, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("User")).accessToken
          }`,
        },
      })
      .then((res) => {
        alert("Đặt vé thành công");
        fetLichChieu();
        handleClose();
      })
      .catch((err) => alert(err.response.data));
  };
  const handleBooking = () => {};
  useEffect(() => {
    fetLichChieu();
    fetListTheater();
  }, []);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {}, [theaterDetail]);
  useEffect(() => {}, [lichChieu]);
  useEffect(() => {}, [listSeat]);
  return (
    <div className="container">
      <h3>Danh sách lịch chiếu</h3>
      <div>
        <h6>Danh sách hệ thống rạp</h6>
        {showListTheater()}
      </div>
      <div>
        {theaterDetail.hits != [] ? <h6>Danh sách cụm rạp</h6> : null}
        {showTheaterDetail()}
      </div>
      <div className="m-2">
        <h6>Mã cụm rạp</h6>
        {showLichChieu()}
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Danh sách ghế</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            className="ml-5"
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {showListSeat()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={fetBooking} color="primary">
            Đặt ghế
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
