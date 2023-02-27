import React from "react";
import { Menu } from "react-admin";
import modules from "../../modules";

const CustomMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />

      {[
        ...modules
          .filter((m) => Boolean(m.sidebar))
          .map((m) => {
            return <Menu.ResourceItem name={m.route} key={m.route} />;
          }),
      ]}
    </Menu>
  );
};

export default CustomMenu;
