import "./App.css";
import HomeTemplate from "./containers/View";
import AdminTemplate from "./containers/Admin";
import { RouteHome, RouteAdmin } from "./Routes";
import { BrowserRouter, Switch } from "react-router-dom";

function App() {
  const showLayoutHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <HomeTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            component={item.component}
          />
        );
      });
    }
  };
  const showLayoutAdmin = (routes) => {
    if (routes.length > 0 && routes) {
      return routes.map((item, index) => {
        return (
          <AdminTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            component={item.component}
          />
        );
      });
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        {showLayoutHome(RouteHome)}
        {showLayoutAdmin(RouteAdmin)}
      </Switch>
    </BrowserRouter>
  );
}
export default App;
