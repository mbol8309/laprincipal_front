import { Fragment, useMemo } from "react";
import {
  Button,
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
import { useNavigate } from "react-router";

const GenericCreate = () => {
  const resource = useResourceContext();
  const { isLoading, isSuccess, data: description } = useFront(`${resource}`);
  const navigate = useNavigate();

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
      <Fragment>
        <Button onClick={() => navigate(-1)} label="Back" />
        <Create>
          <FormGenericGenerator fields={fields} type={views?.list?.type} layout={views?.create?.layout || views?.edit?.layout|| views?.show?.layout  } />
        </Create>
      </Fragment>
    );
  }
  return null;
};

export default GenericCreate;
