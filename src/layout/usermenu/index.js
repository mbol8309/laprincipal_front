import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { useGetIdentity, useLogout, UserMenu } from "react-admin";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import modules from "../../modules";

const CustomUserMenu = (props) => {
  const logout = useLogout();
  const { isLoading } = useGetIdentity();

  const handleLogout = async () => {
    logout();
  };

  const modulesMenus = modules
    .filter((m) => m.usermenu)
    .map((m) => ({ ...m.usermenu, key: m.route }));

  return (
    <UserMenu {...props}>
      {isLoading ? (
        <MenuItem>
          <CircularProgress />
        </MenuItem>
      ) : (
        [
          ...modulesMenus,
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
