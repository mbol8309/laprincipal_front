import { SettingList } from "./Settings/SettingList";
import ValidationRuleEdit from "./ValidationRule/ValidationRuleEdit";
import ValidationRuleCreate from "./ValidationRule/ValidationRuleCreate";
import BannAuthorAction from "./Author/BannAuthorAction";
import RoleEdit from "./Roles/RoleEdit";
import LocalActionEndpoint from "./_system/LocalActionEndpoint";
import LocalActionFormEndpoint from "./_system/LocalActionFormEndpoint";

const modules = {
  //system
  LocalActionEndpoint,
  LocalActionFormEndpoint,
  SettingList,
  ValidationRuleCreate,
  ValidationRuleEdit,

  //Author
  BannAuthorAction,
};

export default modules;
