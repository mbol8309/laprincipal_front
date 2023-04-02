import { RichTextInput } from "ra-input-rich-text";
import { Fragment, useMemo } from "react";
import {
  Button,
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
  SelectInput,
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
import { useNavigate } from "react-router-dom";

const GenericEdit = () => {
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

  const tabbedItems = useMemo(() => {
    return fields?.filter((i) => ["reference_many"].includes(i.type)) ?? [];
  }, [fields]);

  const View = useMemo(() => {
    if (views?.list?.type === "simple") return SimpleForm;
    return SimpleForm;
  }, [views]);

  const navigate = useNavigate();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isSuccess) {
    return (
      <Fragment>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Edit>
          <View>
            {fields &&
              fields?.map((i) => {
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
                    case "selectfield":
                      console.log(i.options)
                      return (
                        <SelectInput
                          source={i.id}
                          key={i.id}
                          choices={i.choices}
                          sortable={Boolean(i?.sort)}
                          label={i?.label ?? undefined}
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
          </View>
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
      </Fragment>
    );
  }
  return null;
};

export default GenericEdit;
