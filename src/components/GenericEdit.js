import { RichTextInput } from "ra-input-rich-text";
import { useMemo } from "react";
import {
  DateField,
  DateInput,
  DateTimeInput,
  Edit,
  EditGuesser,
  EmailField,
  LinearProgress,
  ReferenceArrayInput,
  ReferenceInput,
  ReferenceManyField,
  SimpleForm,
  SimpleShowLayout,
  TabbedForm,
  TextField,
  TextInput,
  useResourceContext,
} from "react-admin";
import { useFront } from "../api/useFront";
import renderReferenceMany from "../utils/renderReferenceMany";
import { ReferenceManyInput } from "./ReferenceManyInput";

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

  const tabbedItems = useMemo(() => {
    if (resourceDescription) {
      return resourceDescription.items.filter((i) =>
        ["reference_many"].includes(i.type)
      );
    }
    return [];
  });

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
                  return (
                    <TextInput
                      source={i.id}
                      key={i.id}
                      label={i?.label ?? undefined}
                      emptyText={i?.empty}
                    />
                  );
                case "emailfield":
                  return (
                    <TextInput
                      source={i.id}
                      key={i.id}
                      label={i?.label ?? undefined}
                      emptyText={i?.empty}
                    />
                  );
                case "datefield":
                  return (
                    <DateInput
                      source={i.id}
                      key={i.id}
                      label={i?.label ?? undefined}
                      emptyText={i?.empty}
                    />
                  );
                case "datetimefield":
                  return (
                    <DateTimeInput
                      source={i.id}
                      key={i.id}
                      label={i?.label ?? undefined}
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
                      emptyText={i?.empty}
                    />
                  );
                case "richtextfield":
                  return (
                    <RichTextInput
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
                      emptyText={i?.empty}
                    />
                  );

                default:
                  return null;
              }
            })}
          </SimpleForm>
          {tabbedItems.length > 0 && (
            <TabbedForm>
              {tabbedItems.map((tab) => (
                <TabbedForm.Tab key={tab.id} label={tab.label}>
                  <ReferenceManyInput
                    target={tab.id}
                    reference={tab.reference}
                    key={tab.id}
                  >
                    {renderReferenceMany(tab.render, true)}
                  </ReferenceManyInput>
                </TabbedForm.Tab>
              ))}
            </TabbedForm>
          )}
        </Edit>
      );
    }
  }
  return null;
};

export default GenericEdit;
