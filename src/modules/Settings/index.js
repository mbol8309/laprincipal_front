import { Settings as SettingsIcon } from "@mui/icons-material";
import { SettingList } from "./SettingList";


const Setting = {
  name: "Setting",
  route: 'setting',
  icon: SettingsIcon,
  sidebar: {
    label: "Settings",
  },
  list:SettingList
};
export default Setting;
