import { ArrayField, ChipField, Datagrid, DateField, DeleteButton, EditButton, EmailField, ReferenceField, ReferenceManyField, RichTextField, SelectField, SimpleShowLayout, SingleFieldList, TextField } from "react-admin";
import renderReferenceMany from "../utils/renderReferenceMany";
import { useMemo } from "react";

const FieldGenericGenerator = ({fields, type, children}) => {

  const View = useMemo(() => {
    if (type === "simple") return SimpleShowLayout;
    if (type === "datagrid") return Datagrid;
    return SimpleShowLayout;
  }, [type]);

  return (
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
              {children}
          </View>
  )
}

export default FieldGenericGenerator