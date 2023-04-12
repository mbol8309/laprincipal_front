import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  EmailField,
  ReferenceField,
  ReferenceManyField,
  RichTextField,
  SelectField,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
} from "react-admin";
import { useCallback, useMemo } from "react";
import LayoutGenerator from "./LayoutGenerator";

const FieldGenericGenerator = ({ fields, type, children, layout=null }) => {
  const View = useMemo(() => {
    if (layout !== null) return LayoutGenerator;
    if (type === "simple") return SimpleShowLayout;
    if (type === "datagrid") return Datagrid;
    return SimpleShowLayout;
  }, [type]);

  const renderField = useCallback((i) => {
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
          <DateField source={i.id} key={i.id} label={i?.label ?? undefined} />
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
              <ChipField source={i?.field ?? "id"} />
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
          <TextField source={i.id} key={i.id} label={i?.label ?? undefined} />
        );
      default:
        return null;
    }
  }, []);

  return (
    <View layout={layout ?? undefined}>
      {fields && fields?.map((i) => {
        return renderField(i)
      })}
    </View>
  );
};

export default FieldGenericGenerator;
