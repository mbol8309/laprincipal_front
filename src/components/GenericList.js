import { LinearProgress } from "@mui/material";
import { useMemo } from "react";
import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  EmailField,
  List,
  ListGuesser,
  ReferenceField,
  ReferenceManyField,
  ReferenceManyFieldView,
  SelectField,
  SingleFieldList,
  TextField,
  TextInput,
  useResourceContext,
} from "react-admin";
import { useFront } from "../api/useFront";
import getParsedFilters from "../utils/getParsedFilters";
import renderReferenceMany from "../utils/renderReferenceMany";

const GenericList = () => {
  const resource = useResourceContext();
  const { isLoading, isSuccess, data: description } = useFront(`${resource}`);

  const { fields, filters, views } = useMemo(() => {
    if (description) {
      return description.items;
    }
    return {};
  }, [description]);

  const View = useMemo(() => {
    if (views?.list.type === "datagrid") return Datagrid;
  }, [views]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isSuccess) {
    return (
      <List
        filters={getParsedFilters(filters)}
        queryOptions={{
          meta: views?.list?.meta ?? undefined,
        }}
      >
        <View {...(views?.list?.options ?? {})}>
          {fields &&
            fields
              ?.filter((f) => f?.views?.includes("list"))
              .map((i) => {
                switch (i.type) {
                  case "textfield":
                    return (
                      <TextField
                        source={i.id}
                        key={i.id}
                        sortable={Boolean(i?.sort)}
                        label={i?.label ?? undefined}
                        emptyText={i?.empty}
                      />
                    );
                  case "emailfield":
                    return (
                      <EmailField
                        source={i.id}
                        key={i.id}
                        sortable={Boolean(i?.sort)}
                        label={i?.label ?? undefined}
                        emptyText={i?.empty}
                      />
                    );
                  case "datefield":
                    return (
                      <DateField
                        source={i.id}
                        key={i.id}
                        sortable={Boolean(i?.sort)}
                        label={i?.label ?? undefined}
                      />
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
                  case "reference_many":
                    return (
                      <ReferenceManyField
                        target={i.id}
                        reference={i.reference}
                        key={i.id}
                        sortable={Boolean(i?.sort)}
                        label={i?.label ?? undefined}
                        emptyText={i?.empty}
                      >
                        {renderReferenceMany(i.render)}
                      </ReferenceManyField>
                    );
                  case "arrayfield":
                    return (
                      <ArrayField
                        source={i.id}
                        label={i?.label ?? undefined}
                        emptyText={i?.empty}
                      >
                        <SingleFieldList>
                          <ChipField source={i?.field ?? 'id'} />
                        </SingleFieldList>
                      </ArrayField>
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
      </List>
    );
  }

  return null;
};

export default GenericList;
