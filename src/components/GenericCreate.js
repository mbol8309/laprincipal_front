

import { useMemo } from "react";
import { Create, DateInput, DateTimeInput, EditGuesser, LinearProgress, SimpleForm, TextInput, useResourceContext } from "react-admin"
import { useFront } from "../api/useFront";

const GenericCreate = () => {
    const resource = useResourceContext();
  const {
    isLoading,
    isSuccess,
    data: description,
  } = useFront(`resources-${resource}_create`);

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
        <Create>
          <SimpleForm>
            {resourceDescription?.items?.map((i) => {
              switch (i.type) {
                case "textfield":
                  return <TextInput source={i.id} key={i.id} />;
                case "emailfield":
                  return <TextInput source={i.id} key={i.id} />;
                case "datefield":
                  return <DateInput source={i.id} key={i.id} />;
                case "datetimefield":
                  return <DateTimeInput source={i.id} key={i.id} />;
                default:
                  return null;
              }
            })}
          </SimpleForm>
        </Create>
      );
    }
  }
  return null;
}

export default GenericCreate