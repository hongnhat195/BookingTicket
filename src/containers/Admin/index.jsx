import React from "react";
import { Route, Redirect } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import Footer from "../../components/Footer";

const LayoutAdmin = (props) => {
  return (
    <>
      <NavBarAdmin />
      {props.children}
      <Footer />
    </>
  );
};
export default function AdminTemplate(props) {
  const { exact, path, component } = props;
  if (!localStorage.getItem("UserAdmin")) return <Redirect to="/SignIn" />;
  return (
    <LayoutAdmin>
      <Route exact={exact} path={path} component={component} />
    </LayoutAdmin>
  );
}
