import { Layout } from "react-admin";
import CustomAppBar from "./appbar";
import CustomMenu from "./menu";

const CustomLayout = (props) => (
  <Layout
    {...props}
    menu={CustomMenu}
    appBar={CustomAppBar}
  />
);

export default CustomLayout;
