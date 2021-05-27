import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { clearLogin } from "../../containers/View/SingIn/Api/actions";
export default function NavBarAdmin() {
  let dispatch = useDispatch();
  const logOut = () => {
    localStorage.clear();
    dispatch(clearLogin());
  };
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container flex ">
        <div className="navbar-header pt-2 ">
          <button
            className="navbar-toggle btn btn-dark mr-3"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <i className="fa fa-tachometer-alt "></i>
          </button>
          <a className="navbar-brand" href="/Db">
            Admin Panel
          </a>
        </div>
        <div className="collapse1 ">
          <ul className="nav navbar-nav navbar-right flex flex-row">
            <li className="mr-5">
              <a href="#">
                <span className="mr-2">
                  <i class="material-icons">admin_panel_settings</i>
                </span>
                Hello Admin
              </a>
            </li>
            <li>
              <a onClick={logOut} href="/">
                <span className="mr-2">
                  <i className="material-icons">logout</i>
                </span>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
