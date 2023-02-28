import { Box, CircularProgress, Grid, Tab, Tabs } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import {
  Datagrid,
  EditBase,
  EditContext,
  EditContextProvider,
  LinearProgress,
  List,
  RecordContextProvider,
  SimpleForm,
  TextField,
  TextInput,
  useEditContext,
  useEditController,
  useGetList,
  useGetOne,
  useListContext,
  useListController,
  useRecordContext,
} from "react-admin";
import { TabPanel } from "../../components/TabPanel";

const SettingItem = ({ value }) => {
  const { record, isLoading } = useEditContext();

  const item = useMemo(() => {
    return record[value];
  }, [value, record]);

  const type = useMemo(() => {
    return item?.type;
  }, [item]);
  const label = useMemo(() => {
    return item?.label;
  }, [item]);

  if (value == "id") {
    return null;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  console.log(item);

  switch (type) {
    case "text":
      return <TextInput source={`${value}.payload`} label={label} />;
    case "integer":
      return (
        <TextInput type="number" source={`${value}.payload`} label={label} />
      );
    default:
      return null;
  }
};

const SettingGroupResource = () => {
  const group = useRecordContext();
  //   const { data, isLoading, error, refetch } = useGetOne("setting", {
  //     id: group?.id,
  //   });
  const editContext = useEditController({
    resource: "setting",
    id: group?.id,
  });
  if (editContext.isLoading) {
    return <LinearProgress />;
  }

  return (
    <Grid container>
      <EditContextProvider value={editContext}>
        <SimpleForm onSubmit={editContext.save}>
          {Object.keys(editContext.record).map((s) => (
            <Grid item md={12}>
              <SettingItem value={s} />
            </Grid>
          ))}
        </SimpleForm>
      </EditContextProvider>
    </Grid>
  );
};

export const SettingList = () => {
  const { data, total, isLoading, error, refetch } = useGetList("setting");
  const [tabValue, setTabValue] = useState(null);

  useEffect(() => {
    if (data && data.length > 0 && !tabValue) {
      setTabValue(data[0].id);
    }
  }, [data]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (isLoading || tabValue == null) {
    return <LinearProgress />;
  }
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={tabValue} onChange={handleChange} aria-label="settigs tab">
        {data.map((s) => (
          <Tab key={s.id} label={s.name} value={s.id} />
        ))}
      </Tabs>
      <React.Fragment>
        {data.map((s) => (
          <TabPanel value={tabValue} index={s.id} key={s.id}>
            <RecordContextProvider value={s}>
              <SettingGroupResource />
            </RecordContextProvider>
          </TabPanel>
        ))}
      </React.Fragment>
    </Box>
  );
};
