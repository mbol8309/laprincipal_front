import { TextInput } from "react-admin";

const getParsedFilters = (filters) => {
    if (filters === undefined || filters === null) {
    return undefined;
  }
  
  return filters?.map((f) => {
    switch (f?.type) {
      case "textfield":
        return <TextInput key={f.id} label={f.label} source={f.id} />;
      default:
        return null;
    }
  });
};

export default getParsedFilters;
