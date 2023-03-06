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
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null)
  return (
    <Menu>
      <Menu.DashboardItem />

      {[
        ...modules
          .filter((m) => Boolean(m.sidebar))
          .map((m) => {
            //  return (<MenuItemLink to={m.route} key={m.route} primaryText={m.sidebar.label} leftIcon={<m.icon/>}/>)
            return (
              <CustomMenuItem item={m} key={m.route} selected={selected} onSelect={setSelected}/>
            );
          }),
      ]}
    </Menu>
  );
};

export default CustomMenu;
