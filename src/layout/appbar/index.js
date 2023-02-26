import { AppBar } from "react-admin";
import CustomUserMenu from "../usermenu";

const CustomAppBar = (props) => (
  <AppBar {...props} userMenu={<CustomUserMenu />} />
);

export default CustomAppBar
