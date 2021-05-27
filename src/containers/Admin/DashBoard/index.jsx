import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./style.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import MovieIcon from "@material-ui/icons/Movie";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import UserItem from "../../../components/UserItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));
const useStyles1 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function DashBoard() {
  const Token = JSON.parse(localStorage.getItem("UserAdmin")).accessToken;
  const classes = useStyles();
  const classes1 = useStyles1();
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [addUser, setAddUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP02",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const [maloai, setMaloai] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setMaloai(e.target.value);
    setAddUser({ ...addUser, [name]: value });
  };
  console.log("user", user);
  const onSetUser = (e) => {
    setUser(e);
  };
  const showUser = () => {
    return user.map((item, index) => {
      return (
        <UserItem value={user} onSetUser={onSetUser} data={item} key={index} />
      );
    });
  };
  const fetUser = async () => {
    const res = await axios
      .get(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02"
      )
      .then((res) => {
        setUser(...user, res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleAddUser = async () => {
    return await axios
      .post(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
        addUser,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log("result", res.data);
        fetUser();
        alert("Thêm thành công");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  useEffect(() => {
    const fetSearcher = async () => {
      if (query != "") {
        const res = await axios.get(
          "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP02&tuKhoa=" +
            query
        );
        setUser(res.data);
      } else fetUser();

      console.log(query);
    };
    fetSearcher();
  }, [query]);

  return (
    <div className="dashboard">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab
              label="Quản lí người dùng"
              icon={<PersonPinIcon />}
              {...a11yProps(2)}
            />
            <Tab label="Quản lí Phim" icon={<MovieIcon />} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <div className="container-fluid align-items-center ">
          <TabPanel value={value} index={0}>
            <div className="input-group flex-nowrap mb-5 mt-5">
              <span className="input-group-text" id="addon-wrapping">
                Search
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                className="mb-5 "
                color="primary"
                onClick={handleClickOpen}
              >
                Thêm người dùng
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={fullScreen}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <p> Nhập thông tin người dùng. Mã nhóm mặc định là GP02 </p>
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="taiKhoan"
                    label="Tài Khoản"
                    type="text"
                    defaultValue={addUser.taiKhoan}
                    fullWidth
                    onChange={handleChange2}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="matKhau"
                    label="Mật khẩu"
                    type="text"
                    fullWidth
                    defaultValue={addUser.matKhau}
                    onChange={handleChange2}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Email"
                    type="text"
                    fullWidth
                    defaultValue={addUser.email}
                    onChange={handleChange2}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="soDt"
                    label="Số ĐT"
                    type="text"
                    fullWidth
                    defaultValue={addUser.soDt}
                    onChange={handleChange2}
                  />
                  <TextField
                    disabled
                    autoFocus
                    margin="dense"
                    name="maNhom"
                    label="Mã nhóm"
                    type="text"
                    defaultValue={addUser.maNhom}
                    fullWidth
                    onChange={handleChange2}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="hoTen"
                    label="Họ tên"
                    type="text"
                    fullWidth
                    defaultValue={addUser.hoTen}
                    onChange={handleChange2}
                  />
                  <FormControl className={classes1.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Loại người dùng
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={maloai}
                      name="maLoaiNguoiDung"
                      onChange={handleChange2}
                    >
                      <MenuItem value={"khachHang"}>Khách hàng</MenuItem>
                      <MenuItem value={"quanTri"}>Quản trị</MenuItem>
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser} color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

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
            {/* <ListUser value={user} onSetUser={onSetUser} /> */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Quản lí Phim
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
