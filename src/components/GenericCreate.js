import { useMemo } from "react";
import {
  Create,
  DateInput,
  DateTimeInput,
  EditGuesser,
  LinearProgress,
  ReferenceInput,
  RichTextField,
  SimpleForm,
  TextInput,
  useResourceContext,
} from "react-admin";
import { useFront } from "../api/useFront";

const GenericCreate = () => {
  const resource = useResourceContext();
  const {
    isLoading,
    isSuccess,
    data: description,
  } = useFront(`resources-${resource}`);

  const { fields, views } = useMemo(() => {
    if (description) {
      return description.items;
    }
    return {};
  }, [description]);

  const View = useMemo(() => {
    if (views?.list?.type === "simple") return SimpleForm;
    return SimpleForm;
  }, [views]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isSuccess) {
    return (
      <Create>
        <View>
          {fields && fields?.map((i) => {
            switch (i.type) {
              case "textfield":
                return <TextInput source={i.id} key={i.id} />;
              case "emailfield":
                return <TextInput source={i.id} key={i.id} />;
              case "datefield":
                return <DateInput source={i.id} key={i.id} />;
              case "datetimefield":
                return <DateTimeInput source={i.id} key={i.id} />;
              case "reference":
                return (
                  <ReferenceInput
                    source={i.id}
                    reference={i.reference}
                    key={i.id}
                    sortable={Boolean(i?.sort)}
                    label={i?.label ?? undefined}
                  />
                );
              case "richtextfield":
                return (
                  <RichTextField
                    source={i.id}
                    key={i.id}
                    label={i?.label ?? undefined}
                  />
                );
              case "textareafield":
                return (
                  <TextInput
                    multiline={true}
                    source={i.id}
                    key={i.id}
                    label={i?.label ?? undefined}
                  />
                );
              default:
                return null;
            }
          })}
        </View>
      </Create>
    );
  }
  return null;
};

export default GenericCreate;
