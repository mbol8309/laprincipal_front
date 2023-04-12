import { LinearProgress } from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  ArrayField,
  Button,
  ChipField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
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
  useRecordContext,
  useResourceContext,
} from "react-admin";
import { useFront } from "../api/useFront";
import getParsedFilters from "../utils/getParsedFilters";
import renderReferenceMany from "../utils/renderReferenceMany";
import renderIconFromString from "../utils/renderIconFromString";
import modules from "../modules";
import FieldGenericGenerator from "./FieldGenericGenerator";

const CustomButton = ({ label, icon, item, color, onClick }) => {
  const record = useRecordContext();

  const handleOnClick = (event) => {
    event.stopPropagation();
    onClick && onClick(item, record);
  };

  return (
    <Button label={label} onClick={handleOnClick} color={color ?? "primary"}>
      {icon && renderIconFromString(icon)}
    </Button>
  );
};

const GenericList = () => {
  const resource = useResourceContext();
  const { isLoading, isSuccess, data: description } = useFront(`${resource}`);

  const { fields, filters, views } = useMemo(() => {
    if (description) {
      return description.items;
    }
    return {};
  }, [description]);

  // const View = useMemo(() => {
  //   if (views?.list.type === "datagrid") return Datagrid;
  // }, [views]);

  const [actionsOpen, setActionsOpen] = useState({});

  const LocalActions = useMemo(() => {
    return views?.list?.actions?.local?.map((action) => (
      <CustomButton
        key={action?.component}
        label={action?.title}
        icon={action?.icon}
        color={action?.color}
        item={action.component}
        onClick={(key, record) =>
          setActionsOpen((actions) => ({
            ...actions,
            [key]: { open: true, record, data: action },
          }))
        }
      />
    ));
  }, [views]);

  useEffect(() => {
    let actionsComponents = views?.list?.actions?.local?.reduce(
      (p, c) => ({
        ...p,
        [c.component]: {
          open: false,
          record: null,
          data: null,
        },
      }),
      {}
    );
    setActionsOpen((actions) => ({
      ...actionsComponents,
      ...actions,
    }));
  }, [views]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isSuccess) {
    return (
      <>
        <List
          filters={getParsedFilters(filters)}
          queryOptions={{
            meta: views?.list?.meta ?? undefined,
          }}
        >
          <FieldGenericGenerator type={views?.list?.type} fields={fields}>
            {views?.edit && <EditButton />}
            {views?.delete && <DeleteButton />}
            {LocalActions}
          </FieldGenericGenerator>
        </List>
        {Object.keys(actionsOpen).map((key) => {
          if (modules && !Object.hasOwn(modules, key)) return null;
          const Component = modules[key];
          return (
            <Component
              key={key}
              open={actionsOpen[key]?.open ?? false}
              record={actionsOpen[key]?.record ?? null}
              data={actionsOpen[key]?.data}
              onClose={() =>
                setActionsOpen((action) => ({ ...action, [key]: false }))
              }
            />
          );
        })}
      </>
    );
  }

  return null;
};

export default GenericList;
