import {
  Collapse,
  Icon,
  LinearProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Menu, MenuItemLink, MenuGroup, Link, useGetOne } from "react-admin";
import { useNavigate } from "react-router";
import "./index.css";
import CustomMenuItem from "../../components/CustomMenuItem";
import { useFront } from "../../api/useFront";
import { BACKEND_SYS_MENU } from "../../configs";

const CustomMenu = (props) => {
  const [selected, setSelected] = useState(null);

  const { isLoading, isSuccess, data: menu } = useFront(`${BACKEND_SYS_MENU}`);
  return (
    <>
      {isLoading && <LinearProgress />}
      <Menu>
        <Menu.DashboardItem />

        {/* {[
        ...modules
          .filter((m) => Boolean(m.sidebar))
          .map((m) => {
            //  return (<MenuItemLink to={m.route} key={m.route} primaryText={m.sidebar.label} leftIcon={<m.icon/>}/>)
            return (
              <CustomMenuItem item={m.sidebar} key={m.name} selected={selected} onSelect={setSelected} children={m.sidebar.children}/>
            );
          }),
      ]} */}
        {isSuccess && [
          ...menu?.items?.map((m) => {
            return (
              <CustomMenuItem
                item={m}
                key={m.id}
                selected={selected}
                onSelect={setSelected}
              />
              // <MenuItemLink
              //   to={m.route}
              //   key={m.route}
              //   primaryText={m.label}
              //   leftIcon={renderIconFromString(m.icon)}
              // />
            );
          }),
        ]}
      </Menu>
    </>
  );
};

export default CustomMenu;
