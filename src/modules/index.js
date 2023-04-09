import { SettingList } from "./Settings/SettingList";
import ValidationRuleEdit from "./ValidationRule/ValidationRuleEdit";
import ValidationRuleCreate from "./ValidationRule/ValidationRuleCreate";
import BannAuthorAction from "./Author/BannAuthorAction";
import RoleEdit from "./Roles/RoleEdit";
import LocalActionEndpoint from "./_system/LocalActionEndpoint";

const modules = {
    SettingList,
    ValidationRuleCreate,
    ValidationRuleEdit,
    RoleEdit,
    //Author
    BannAuthorAction,
    LocalActionEndpoint
};

export default modules