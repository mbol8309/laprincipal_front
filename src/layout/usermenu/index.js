import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { useGetIdentity, useLogout, UserMenu } from "react-admin";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import modules from "../../modules";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const CustomUserMenu = (props) => {
  const logout = useLogout();
  const { isLoading } = useGetIdentity();

  const handleLogout = async () => {
    logout();
  };

  // const [menus, setMenus] = useState([]);

  // useEffect(() => {
  //   let modulesMenus = modules
  //     .filter((m) => m.usermenu)
  //     .map((m) => (
  //       <MenuItem key={m.route} onClick={() => navigate(m.route)}>
  //         <ListItemIcon>
  //           <m.usermenu.icon />
  //         </ListItemIcon>
  //       </MenuItem>
  //     ));
  //   setMenus(modulesMenus);
  // },[modules]);

  const navigate = useNavigate();

  return (
    <UserMenu {...props}>
      {isLoading ? (
        <MenuItem>
          <CircularProgress />
        </MenuItem>
      ) : (
        [
          ...modules.filter(x=>x.usermenu).map(x=><x.usermenu/>),
          
          <MenuItem onClick={handleLogout} key="logout-menu">
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>,
        ]
      )}
    </UserMenu>
  );
};

export default CustomUserMenu;
