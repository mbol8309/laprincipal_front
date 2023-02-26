import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { useGetIdentity, useLogout, UserMenu } from "react-admin";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ProfileMenuItem from "./profile";

const CustomUserMenu = (props) => {
  const logout = useLogout();
  const { isLoading } = useGetIdentity();

  const handleLogout = async () => {
    logout();
  };

  return (
    <UserMenu {...props}>
      {isLoading ? (
        <MenuItem>
          <CircularProgress />
        </MenuItem>
      ) : (
        [
          <ProfileMenuItem key='profile-menu' />,
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

export default CustomUserMenu
