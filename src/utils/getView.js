import GenericCreate from "../components/GenericCreate";
import GenericEdit from "../components/GenericEdit";
import GenericList from "../components/GenericList";
import GenericShow from "../components/GenericShow";
import modules from "../modules";
import SnakeCaseToPascalCase from "./SnakeCaseToPascalCase";

const getView = (resource, view, value) => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (value === "generic") {
    switch (view) {
      case "list":
        return GenericList;
      case "edit":
        return GenericEdit;
      case "show":
        return GenericShow;
      case "create":
        return GenericCreate;
      default:
        return null;
    }
  }
  if (value === "custom") {
    let formatView = String(view).charAt(0).toUpperCase() + view.slice(1);
    let formatResource = SnakeCaseToPascalCase(resource)
    let component = formatResource + formatView;

    if (Object.hasOwn(modules, component)) {
      return modules[component];
    }
    return null;
  }
};

export default getView;
