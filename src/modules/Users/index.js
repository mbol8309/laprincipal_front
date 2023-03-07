import { Person as PersonIcon } from "@mui/icons-material";
import GroupsIcon from '@mui/icons-material/Groups';
import { UserEdit } from "./UserEdit";
import { UserShow } from "./UserShow";


const User = {
  name: "User",
  sidebar: {
    label: "Users & Groups",
    route: 'user&groups',
    icon: PersonIcon,
    children:[
      {
        label: "User",
        route: 'user',
        icon: PersonIcon,
      },
      {
        label: "Groups",
        route: 'user2',
        icon: GroupsIcon,
      },
      
    ]
  },
  show: UserShow,
  edit: UserEdit
};
export default User;
