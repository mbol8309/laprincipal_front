import { useMemo } from "react";
import {
  DateField,
  DateInput,
  DateTimeInput,
  Edit,
  EditGuesser,
  EmailField,
  LinearProgress,
  ReferenceInput,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useResourceContext,
} from "react-admin";
import { useFront } from "../api/useFront";

const GenericEdit = () => {
  const resource = useResourceContext();
  const {
    isLoading,
    isSuccess,
    data: description,
  } = useFront(`resources-${resource}_edit`);

  const resourceDescription = useMemo(() => {
    if (description) {
      return description.items;
    }
    return null;
  }, [description]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isSuccess) {
    if (resourceDescription?.type === "simple") {
      return (
        <Edit>
          <SimpleForm>
            {resourceDescription?.items?.map((i) => {
              switch (i.type) {
                case "textfield":
                  return <TextInput source={i.id} key={i.id} label={i?.label ?? undefined} />;
                case "emailfield":
                  return <TextInput source={i.id} key={i.id} label={i?.label ?? undefined}/>;
                case "datefield":
                  return <DateInput source={i.id} key={i.id} label={i?.label ?? undefined}/>;
                case "datetimefield":
                  return <DateTimeInput source={i.id} key={i.id} label={i?.label ?? undefined}/>;
                  case "reference":
                    return <ReferenceInput source={i.id} reference={i.reference} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                default:
                  return null;
              }
            })}
          </SimpleForm>
        </Edit>
      );
    }
  }
  return null;
};

export default GenericEdit;
