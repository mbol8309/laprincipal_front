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

  const View = useMemo(() => {
    if (views?.list?.type === "simple") return SimpleShowLayout;
    return SimpleShowLayout;
  }, [views]);

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
          <View>
            {fields &&
              fields?.map((i) => {
                switch (i.type) {
                  case "textfield":
                    return (
                      <TextField
                        source={i.id}
                        key={i.id}
                        label={i?.label ?? undefined}
                        emptyText={i?.empty}
                      />
                    );
                  case "emailfield":
                    return (
                      <EmailField
                        source={i.id}
                        key={i.id}
                        label={i?.label ?? undefined}
                        emptyText={i?.empty}
                      />
                    );
                  case "datefield":
                    return (
                      <DateField
                        source={i.id}
                        key={i.id}
                        label={i?.label ?? undefined}
                      />
                    );
                    case "arrayfield":
                      return (
                        <ArrayField
                          source={i.id}
                          key={i.id}
                          label={i?.label ?? undefined}
                          emptyText={i?.empty}
                        >
                          <SingleFieldList>
                            <ChipField source={i?.field ?? 'id'} />
                          </SingleFieldList>
                        </ArrayField>
                      );
                  case "selectfield":
                    return (
                      <SelectField
                        source={i.id}
                        key={i.id}
                        choices={i.choices}
                        sortable={Boolean(i?.sort)}
                        label={i?.label ?? undefined}
                      />
                    );
                  case "reference":
                    return (
                      <ReferenceField
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
                      <RichTextField
                        source={i.id}
                        key={i.id}
                        label={i?.label ?? undefined}
                      />
                    );
                  case "textareafield":
                    return (
                      <TextField
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
