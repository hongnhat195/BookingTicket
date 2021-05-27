import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import { NavLink } from "react-router-dom";
import Logo from "../../img/logo.png";
import { clearLogin } from "../../containers/View/SingIn/Api/actions";
class NavBarHome extends Component {
  state = { logout: false, className: "header-section" };

  handleScroll = () => {
    if (window.pageYOffset > 0) {
      this.setState({ className: "header-active" });
    } else {
      this.setState({ className: "header-section" });
    }
  };
  clear = () => {
    localStorage.clear();

    this.setState(
      {
        logout: !this.state.logout,
      },
      () => {
        console.log(this.state.logout);
      }
    );
    this.props.dispatch(clearLogin());
  };

  NavbarHome11 = () => {
    if (!localStorage.getItem("User")) {
      return (
        <div className="container">
          <div className="header-wrappers">
            <div className="row">
              <div className="col-3">
                <a href="#1" display="inline-block">
                  <img
                    src={Logo}
                    alt="logo"
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                </a>
              </div>
              <div className="col-9">
                <NavLink className="navlink " to="./">
                  Home
                </NavLink>
                <NavLink className="navlink " to="./SignIn">
                  Sign In
                </NavLink>
                <NavLink className="navlink " to="./SignUp">
                  Sign Up
                </NavLink>
                <NavLink className="navlink" to="./">
                  About Us
                </NavLink>
                <NavLink className="navlink nav1 " to="./">
                  Booking Ticket
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="header-wrappers">
            <div className="row">
              <div className="col-3">
                <a href="#1" display="inline-block">
                  <img
                    src={Logo}
                    alt="logo"
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                </a>
              </div>
              <div className="col-9">
                <NavLink className="navlink " to="./">
                  Home
                </NavLink>
                <NavLink className="navlink " to="./Personal">
                  My Account
                </NavLink>
                <NavLink className="navlink " to="./SignUp">
                  Sign Up
                </NavLink>
                <NavLink className="navlink" to="./" onClick={this.clear}>
                  Log Out
                </NavLink>
                <NavLink className="navlink nav1 " to="./">
                  Booking Ticket
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  render() {
    return <div className={this.state.className}>{this.NavbarHome11()}</div>;
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.loginUserReducer.login,
  };
};
export default connect(mapStateToProps)(NavBarHome);
