import { RichTextInput } from "ra-input-rich-text";
import { Fragment, useMemo } from "react";
import {
  AutocompleteArrayInput,
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
  SelectArrayInput,
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
import FormGenericGenerator from "./FormGenericGenerator";

const GenericEdit = () => {
  const resource = useResourceContext();
  const { isLoading, isSuccess, data: description } = useFront(`${resource}`);

  const { fields, views } = useMemo(() => {
    if (description) {
      return description.items;
    }
    return {};
  }, [description]);

  const tabbedItems = useMemo(() => {
    return fields?.filter((i) => ["reference_many"].includes(i.type)) ?? [];
  }, [fields]);

  // const View = useMemo(() => {
  //   if (views?.list?.type === "simple") return SimpleForm;
  //   return SimpleForm;
  // }, [views]);

  const navigate = useNavigate();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isSuccess) {
    return (
      <Fragment>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Edit
          queryOptions={{
            meta: views?.edit?.meta ?? undefined,
            select: (data) => {
              let mapping = views?.edit?.meta?.with?.reduce((prev, curr) => {
                prev[curr] = data[curr] && data[curr].map((c) => c?.id);
                return prev;
              }, {});

              return {
                ...data,
                ...mapping,
              };
            },
          }}
        >
          <FormGenericGenerator fields={fields} type={views?.list?.type}/>
          {false && tabbedItems.length > 0 && (
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
