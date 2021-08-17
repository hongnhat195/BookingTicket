import React from "react";
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
