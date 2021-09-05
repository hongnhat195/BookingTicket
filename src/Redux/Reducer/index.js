import { combineReducers } from "redux";
import SignUpReducer from "../../containers/View/SignUp/Api/reducers";
import loginUserReducer from "../../containers/View/SingIn/Api/reducers";
import postUserReducer from "../../containers/View/PersonnalInformation/Api/reducer";
import reducer1 from "./course";

const reducer = combineReducers({
  reducer1,
  loginUserReducer,
  SignUpReducer,
  postUserReducer,

});
export default reducer;
