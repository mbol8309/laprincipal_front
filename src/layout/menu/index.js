import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Menu, MenuItemLink, MenuGroup, Link } from "react-admin";
import modules from "../../modules";
import { useNavigate } from "react-router";
import "./index.css";
import CustomMenuItem from "../../components/CustomMenuItem";

const CustomMenu = (props) => {
  const [selected, setSelected] = useState(null)
  console.log(selected)
  return (
    <Menu>
      <Menu.DashboardItem />

      {[
        ...modules
          .filter((m) => Boolean(m.sidebar))
          .map((m) => {
            //  return (<MenuItemLink to={m.route} key={m.route} primaryText={m.sidebar.label} leftIcon={<m.icon/>}/>)
            return (
              <CustomMenuItem item={m.sidebar} key={m.name} selected={selected} onSelect={setSelected} children={m.sidebar.children}/>
            );
          }),
      ]}
    </Menu>
  );
};

export default CustomMenu;
