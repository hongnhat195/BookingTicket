import React, { Component } from "react";
import { Route } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBarHome from "../../components/NavBarHome";
function LayoutHome(props) {
  console.log("props", props.children.props);
  const path = props.children.props.path;
  if (path != "/SignIn" && path != "/SignUp") {
    return (
      <>
        <NavBarHome />
        {props.children}
        <Footer />
      </>
    );
  } else return <> {props.children} </>;
}
export default class HomeTemplate extends Component {
  render() {
    const { exact, path, component } = this.props;
    return (
      <LayoutHome>
        <Route exact={exact} path={path} component={component} />
      </LayoutHome>
    );
  }
}
