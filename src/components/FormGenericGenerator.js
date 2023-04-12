import { RichTextInput } from "ra-input-rich-text";
import { useMemo } from "react";
import {
  AutocompleteArrayInput,
  DateInput,
  DateTimeInput,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import FormLayoutGenerator from "./FormLayoutGenerator";

const FormGenericGenerator = ({ fields, type, onSubmit, layout=null }) => {
  const View = useMemo(() => {
    if (layout !== null) return FormLayoutGenerator;
    if (type === "simple") return SimpleForm;
    return SimpleForm;
  }, [type, layout]);

  return (
    <View onSubmit={onSubmit ?? undefined} layout={layout ?? undefined}>
      {fields &&
        fields?.map((i) => {
          switch (i.type) {
            case "textfield":
              return (
                <TextInput
                  source={i.id}
                  key={i.id}
                  label={i?.label ?? undefined}
                  disabled={i?.disabled ?? false}
                />
              );
            case "emailfield":
              return (
                <TextInput
                  source={i.id}
                  key={i.id}
                  label={i?.label ?? undefined}
                  disabled={i?.disabled ?? false}
                />
              );
            case "datefield":
              return (
                <DateInput
                  source={i.id}
                  key={i.id}
                  label={i?.label ?? undefined}
                  disabled={i?.disabled ?? false}
                />
              );
            case "selectfield":
              return (
                <SelectInput
                  source={i.id}
                  key={i.id}
                  choices={i.choices}
                  sortable={Boolean(i?.sort)}
                  label={i?.label ?? undefined}
                  disabled={i?.disabled ?? false}
                />
              );
            case "datetimefield":
              return (
                <DateTimeInput
                  source={i.id}
                  key={i.id}
                  label={i?.label ?? undefined}
                  disabled={i?.disabled ?? false}
                />
              );
            case "reference":
              return (
                <ReferenceInput
                  source={i.id}
                  reference={i.reference}
                  key={i.id}
                  sortable={Boolean(i?.sort)}
                  label={i?.label ?? undefined}
                  disabled={i?.disabled ?? false}
                />
              );
            case "richtextfield":
              return (
                <RichTextInput
                  source={i.id}
                  key={i.id}
                  label={i?.label ?? undefined}
                  disabled={i?.disabled ?? false}
                />
              );
            case "reference_many":
              return (
                <ReferenceArrayInput
                  source={"books.id"}
                  reference={i.reference}
                  key={i.id}
                ></ReferenceArrayInput>
              );
            case "arrayfield":
              return (
                <ReferenceArrayInput
                  source={i.id}
                  key={i.id}
                  label={i.label ?? undefined}
                  reference={i.reference}
                >
                  <AutocompleteArrayInput
                    optionText={i?.field ?? "name"}
                    filterToQuery={(searchText) => ({
                      [i?.field ?? "name"]: searchText,
                    })}
                    disabled={i?.disabled ?? false}
                  />
                </ReferenceArrayInput>
              );

            default:
              return null;
          }
        })}
    </View>
  );
};

export default FormGenericGenerator;
