import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Menu, MenuItemLink, MenuGroup, Link } from "react-admin";
import modules from "../../modules";

const CustomMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />

      {[
        ...modules
          .filter((m) => Boolean(m.sidebar))
          .map((m) => {
             return (<MenuItemLink to={m.route} key={m.route} primaryText={m.sidebar.label} leftIcon={<m.icon/>}/>)
          }),
      ]}
    </Menu>
  );
};

export default CustomMenu;
