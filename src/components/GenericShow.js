import { Fragment, useMemo } from "react";
import {
  ArrayField,
  Button,
  ChipField,
  DateField,
  EmailField,
  LinearProgress,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  RichTextField,
  SelectField,
  Show,
  ShowGuesser,
  SimpleShowLayout,
  SingleFieldList,
  TabbedShowLayout,
  TextField,
  useChoices,
  useResourceContext,
} from "react-admin";
import { useFront } from "../api/useFront";
import renderReferenceMany from "../utils/renderReferenceMany";
import { useNavigate } from "react-router-dom";
import FieldGenericGenerator from "./FieldGenericGenerator";
import LayoutGenerator from "./LayoutGenerator";

const GenericShow = () => {
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
  //   if (views?.list?.type === "simple") return SimpleShowLayout;
  //   return SimpleShowLayout;
  // }, [views]);

  const tabbedItems = useMemo(() => {
    return fields?.filter((i) => ["reference_many"].includes(i.type)) ?? [];
  }, [fields]);

  const navigate = useNavigate();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isSuccess) {
    return (
      <Fragment>
        <Button onClick={() => navigate(-1)} label="Back"/>
        <Show queryOptions={{
          meta: views?.show?.meta ?? undefined
        }}>
          <FieldGenericGenerator type={views?.show?.type} fields={fields} layout={views?.show?.layout || views?.create?.layout || views?.edit?.layout}/>
          {tabbedItems.length > 0 && (
            <TabbedShowLayout>
              {tabbedItems.map((tab) => (
                <TabbedShowLayout.Tab key={tab.id} label={tab.label}>
                  <ReferenceManyField
                    target={tab.id}
                    reference={tab.reference}
                    key={tab.id}
                    pagination={<Pagination />}
                  >
                    {renderReferenceMany(tab.render)}
                  </ReferenceManyField>
                </TabbedShowLayout.Tab>
              ))}
            </TabbedShowLayout>
          )}
        </Show>
      </Fragment>
    );
  }
  return null;
};

export default GenericShow;
