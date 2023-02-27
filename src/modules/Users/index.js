import { Person as PersonIcon } from "@mui/icons-material";
import { UserEdit } from "./UserEdit";
import { UserShow } from "./UserShow";


const User = {
  name: "User",
  route: 'user',
  icon: PersonIcon,
  sidebar: {
    label: "Users"
  },
  show: UserShow,
  edit: UserEdit
};
export default User;
