import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { useGetIdentity, useLogout, UserMenu } from "react-admin";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { useFront } from "../../api/useFront";
import renderIconFromString from "../../utils/renderIconFromString";
import replaceStringsWithContextValues from "../../utils/replaceStringWithContextValue";

const CustomUserMenu = (props) => {
  const logout = useLogout();
  const { isLoading, data: identity } = useGetIdentity();

  const handleLogout = async () => {
    logout();
  };

  const contextValues = useMemo(
    () => ({
      user_id: identity?.id,
      user_name: identity?.fullName,
    }),
    [identity]
  );

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

  const {
    isLoading: menuLoading,
    isSuccess,
    data: usermenu,
  } = useFront("usermenu");

  const customUserMenu = useMemo(() => {
    return usermenu?.items.map((i) => (
      <MenuItem
        onClick={() =>
          navigate(replaceStringsWithContextValues(i.route, contextValues))
        }
        key={i.id}
      >
        <ListItemIcon>{renderIconFromString(i.icon)}</ListItemIcon>
        <ListItemText>
          {replaceStringsWithContextValues(i.label, contextValues)}
        </ListItemText>
      </MenuItem>
    ));
  }, [usermenu, navigate, contextValues]);

  return (
    <UserMenu {...props}>
      {isLoading || menuLoading ? (
        <MenuItem>
          <CircularProgress />
        </MenuItem>
      ) : (
        [
          // ...modules.filter(x=>x.usermenu).map(x=><x.usermenu/>),
          ...customUserMenu,
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
