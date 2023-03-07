import { Settings as SettingsIcon } from "@mui/icons-material";
import { SettingList } from "./SettingList";


const Setting = {
  name: "Setting",
  sidebar: {
    label: "Settings",
    route: 'setting',
    icon: SettingsIcon,
    list:SettingList
  },
};
export default Setting;
