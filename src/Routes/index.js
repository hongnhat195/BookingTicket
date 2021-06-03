import BookingInformation from "../containers/View/BookingInformation";
import DetailFilm from "../containers/View/DetailFIlm";
import BookingSeat from "../containers/View/Booking_Seat";
import Home from "../containers/View/Home";
import Personal from "../containers/View/PersonnalInformation";
import ShowTimes from "../containers/View/Showtimes";
import SignUp from "../containers/View/SignUp";
import SignIn from "../containers/View/SingIn";
import DashBoard from "../containers/Admin/DashBoard";
const RouteHome = [
  {
    exact: true,
    path: "/",
    component: Home,
  },
  {
    exact: false,
    path: "/BookingInformation/:id",
    component: BookingInformation,
  },
  // {
  //   exact: false,
  //   path: "/BookingSeat",
  //   component: BookingSeat,
  // },
  {
    exact: false,
    path: "/DetailFilm/:id",
    component: DetailFilm,
  },
  {
    exact: false,
    path: "/Personal",
    component: Personal,
  },
  {
    exact: false,
    path: "/ShowTimes",
    component: ShowTimes,
  },
  {
    exact: false,
    path: "/SignUp",
    component: SignUp,
  },
  { exact: false, path: "/SignIn", component: SignIn },
];
const RouteAdmin = [
  {
    exact: false,
    path: "/Db",
    component: DashBoard,
  },
];
export { RouteAdmin, RouteHome };
