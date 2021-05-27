import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./style.css";
import TheaterList from "./TheaterList";
import TheaterDetail from "./TheaterDetail";
import MovieSchedule from "./MovieSchedule";
import ListSeat from "./ListSeat";

class BookingInformation extends Component {
  state = {
    maCumRap: "",
    danhSachGhe: [],
    thongTinPhim: [],
    trangThaiDatVe: false,
  };
  setlaiState = (e) => {
    this.setState(
      {
        maCumRap: e,
      },
      () => {
        console.log("state", this.state.maCumRap);
      }
    );
  };
  setlaiState1 = (e, f) => {
    this.setState(
      {
        danhSachGhe: e,
        thongTinPhim: f,
      },
      () => {
        console.log("state", this.state.danhSachGhe, this.state.maLichChieu);
      }
    );
  };

  filterxx = (maHeThongRap, maCumRap) => {
    let a = this.props.infoShowfilm.heThongRapChieu.filter((item) => {
      return item.maHeThongRap == maHeThongRap;
    });

    a = a[0];
    console.log("a", a);
    if (a == undefined) {
      return;
    }
    let b = a.cumRapChieu.filter((item) => {
      return item.maCumRap == maCumRap;
    });
    b = b[0];
    console.log("b", b);
    if (b == undefined) {
      return;
    }
    console.log(b.lichChieuPhim);
    return b.lichChieuPhim.map((item, key) => {
      return (
        <MovieSchedule onSetState={this.setlaiState1} key={key} data={item} />
      );
    });
  };
  showTheaterDetail = () => {
    if (this.props.infoTheaterDetail) {
      return this.props.infoTheaterDetail.map((item, key) => {
        return (
          <TheaterDetail onSetState={this.setlaiState} data={item} key={key} />
        );
      });
    }
  };
  showTheater = () => {
    if (this.props.infoTheaterCourse) {
      return this.props.infoTheaterCourse.map((item, key) => {
        return <TheaterList key={key} data={item} />;
      });
    }
  };
  showFilms = () => {
    if (this.props.infoTheater && this.state.maCumRap != "") {
      return this.filterxx(
        this.props.infoTheater[0].maHeThongRap,
        this.state.maCumRap
      );
    }
  };
  showSchedule = () => {
    if (
      this.state.danhSachGhe &&
      this.props.infoTheaterDetail &&
      this.state.maCumRap != "" &&
      this.showFilms()
    ) {
      return this.state.danhSachGhe.map((item, index) => {
        return <ListSeat value={this.state} key={index} data={item} />;
      });
    }
  };
  test = async () => {
    const login = {
      maLichChieu: 16963,
      danhSachVe: [
        {
          maGhe: 52523,
          giaVe: 75000,
        },
      ],
      taiKhoanNguoiDung: "1122",
    };
    const res = await axios.post(
      "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      login,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTEyMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IktoYWNoSGFuZyIsIm5iZiI6MTYyMTc4NTM5NCwiZXhwIjoxNjIxNzg4OTk0fQ.yDw9mUlStANYn7Du_Tvr2k0TVwnD2n0p-VrIMayCYF0",
        },
      }
    );
    console.log("res", res);
  };
  render() {
    console.log(
      this.props.infoTheaterCourse,
      this.props.infoTheaterDetail,
      this.props.infoTheater,
      this.props.infoShowfilm
    );

    return (
      <div
        style={{
          overflow: "auto",
        }}
        className="booking container "
      >
        <h1>Đặt vé</h1>
        <button onClick={this.test} className="btn btn-dark">
          Test
        </button>
        <div className="row ">
          <div className="col-2">{this.showTheater()}</div>
          <div className="col-3">{this.showTheaterDetail()}</div>
          <div className="col-3"> {this.showFilms()}</div>
          <div className="col-4">{this.showSchedule()}</div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
const mapStateToProps = (state) => {
  return {
    infoShowfilm: state.getFilmShow.infoShowfilm,
    infoTheaterCourse: state.reducer1.infoTheaterCourse,
    infoTheaterDetail: state.reducer1.infoTheaterDetail,
    infoTheater: state.reducer1.infoTheater,
  };
};

export default connect(mapStateToProps)(BookingInformation);
