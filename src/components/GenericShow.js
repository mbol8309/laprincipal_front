import { Fragment, useMemo } from "react";
import {
  Button,
  DateField,
  EmailField,
  LinearProgress,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  RichTextField,
  Show,
  ShowGuesser,
  SimpleShowLayout,
  TabbedShowLayout,
  TextField,
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
  } = useFront(`resources-${resource}_show`);

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

  const navigate = useNavigate();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isSuccess) {
    if (resourceDescription?.type === "simple") {
      return (
        <Fragment>
          <Button onClick={() => navigate(-1)}>Back</Button>

          <Show>
            <SimpleShowLayout>
              {resourceDescription?.items?.map((i) => {
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
                  // case "reference_many":
                  //   return (
                  //     <ReferenceManyField
                  //       target={i.id}
                  //       reference={i.reference}
                  //       key={i.id}
                  //       sortable={Boolean(i?.sort)}
                  //       label={i?.label ?? undefined}
                  //     >
                  //       {renderReferenceMany(i.render)}
                  //     </ReferenceManyField>
                  //   );
                  default:
                    return null;
                }
              })}
            </SimpleShowLayout>
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
  }
  return null;
};

export default GenericShow;
