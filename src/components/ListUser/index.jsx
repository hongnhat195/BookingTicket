import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UserItem from "../UserItem";

export default function ListUser(props) {
  console.log("pr", props);
  const onSetState = (e) => {
    props.onSetUser(e);
  };
  const showUser = () => {
    return props.value.map((item, index) => {
      return <UserItem onSetState={onSetState} data={item} key={index} />;
    });
  };

  return (
    <div>
      <table className="table align-items-center">
        <thead>
          <tr>
            <th scope="">Tài Khoản</th>
            <th scope="col">Mật Khẩu</th>
            <th scope="col">Họ Tên</th>
            <th scope="col">Email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Tùy chỉnh</th>
          </tr>
        </thead>
        <tbody>{showUser()}</tbody>
      </table>
    </div>
  );
}
