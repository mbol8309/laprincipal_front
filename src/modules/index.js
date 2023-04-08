import Profile from "./Profile";
import Setting from "./Settings"
import { SettingList } from "./Settings/SettingList";
import ValidationRuleEdit from "./ValidationRule/ValidationRuleEdit";
import ValidationRuleCreate from "./ValidationRule/ValidationRuleCreate";
import BannAuthorAction from "./Author/BannAuthorAction";
import RoleEdit from "./Roles/RoleEdit";

const modules = {
    SettingList,
    ValidationRuleCreate,
    ValidationRuleEdit,
    RoleEdit,
    //Author
    BannAuthorAction
};

export default modules