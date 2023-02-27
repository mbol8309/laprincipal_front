import { Box, Grid, Tab, Tabs } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  Datagrid,
  LinearProgress,
  List,
  RecordContextProvider,
  TextField,
  useGetList,
  useGetOne,
  useListContext,
  useListController,
  useRecordContext,
} from "react-admin";
import { TabPanel } from "../../components/TabPanel";

const SettingItem = () => {
  const item = useRecordContext();
  return item.name;
};

const SettingGroupResource = () => {
  const group = useRecordContext();
  const { data, isLoading, error, refetch } = useGetOne("setting", {
    id: group?.id,
  });
  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <Grid container>
      {Object.values(data).map((s) => (
        <Grid item md={12}>
          <RecordContextProvider value={s} key={s.id}>
            <SettingItem />
          </RecordContextProvider>
        </Grid>
      ))}
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
