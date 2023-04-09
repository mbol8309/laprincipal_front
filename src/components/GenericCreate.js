import { useMemo } from "react";
import {
  Create,
  DateInput,
  DateTimeInput,
  EditGuesser,
  LinearProgress,
  ReferenceInput,
  RichTextField,
  SelectInput,
  SimpleForm,
  TextInput,
  useResourceContext,
} from "react-admin";
import { useFront } from "../api/useFront";
import FormGenericGenerator from "./FormGenericGenerator";

const GenericCreate = () => {
  const resource = useResourceContext();
  const {
    isLoading,
    isSuccess,
    data: description,
  } = useFront(`${resource}`);

  const { fields, views } = useMemo(() => {
    if (description) {
      return description.items;
    }
    return {};
  }, [description]);

  // const View = useMemo(() => {
  //   if (views?.list?.type === "simple") return SimpleForm;
  //   return SimpleForm;
  // }, [views]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isSuccess) {
    return (
      <Create>
        <FormGenericGenerator fields={fields} type={views?.list?.type}/>
      </Create>
    );
  }
  return null;
};

export default GenericCreate;
