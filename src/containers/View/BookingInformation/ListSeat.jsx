import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
export default function ListSeat(props) {
  const [booking, setBooking] = useState(
    props.data.daDat == false ? false : true
  );
  const bookingTicket = () => {
    console.log("props1", props.value);
    const state = {
      maLichChieu: props.value.thongTinPhim.maLichChieu,
      danhSachVe: [
        {
          maGhe: props.data.maGhe,
          giaVe: props.data.giaVe,
        },
      ],
      taiKhoanNguoiDung: JSON.parse(localStorage.getItem("User")).taiKhoan,
    };
    console.log("state", state);
    Swal.fire({
      title: "Thông tin đặt chỗ",
      html: `
      <p><strong>Cụm rạp:</strong> ${props.value.thongTinPhim.tenCumRap} </p>
      <p><strong>Tên rạp:</strong> ${props.value.thongTinPhim.tenRap}</p>
      <p><strong>Số ghế:</strong> ${props.data.tenGhe}</p>
      <p><strong>Giá vé:</strong> ${props.data.giaVe} vnđ</p>
      
      <p><strong>Giờ chiếu:</strong> ${props.value.thongTinPhim.gioChieu}</p>
      <p><strong>Ngày chiếu:</strong> ${props.value.thongTinPhim.ngayChieu}</p>
               
      `,
      showCancelButton: true,
      confirmButtonText: "Đặt vé",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios
          .post(
            "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
            state,
            {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("User")).accessToken
                }`,
              },
            }
          )
          .then((response) => {
            if (response.status != 200) {
              throw new Error("Something went wrong");
            }

            return response.data;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value}`,
        });
      }
    });
  };
  return (
    <div className="col-12 m-2">
      <button
        disabled={booking}
        className="btn btn-warning"
        onClick={bookingTicket}
      >
        <span>Số ghế: {props.data.tenGhe}</span>
        <br />
        <span>
          Loại ghế: {props.data.loaiGhe == "Thuong" ? "Thường" : "Vip"}
        </span>
        <br />
        <span>Giá vé: {props.data.giaVe} vnđ</span>
        <br />
        <span>
          Trạng thái: {props.data.daDat == true ? "Đã Đặt" : "Chưa đặt"}
        </span>
      </button>
    </div>
  );
}
