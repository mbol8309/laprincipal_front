import styled from "@emotion/styled";
import { ViewColumnSharp } from "@mui/icons-material";
import { Grid, Paper, Stack } from "@mui/material";
import React, { Children, isValidElement } from "react";
import { Labeled } from "react-admin";

const Root = styled("div", {
  name: "RaSimpleShowLayout",
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  flex: 1,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}));

const LayoutGenerator = ({ layout, children }) => {
  return (
    <Root>
      <Stack container spacing={2}>
        {layout?.map((row, index) => (
          <Grid key={index} container item spacing={2} lg={12}>
            {row?.fields.map((column, index) => (
              <Grid
                key={index}
                item
                xs={column?.size?.xs ?? undefined}
                sm={column?.size?.sm ?? undefined}
                md={column?.size?.md ?? undefined}
                lg={column?.size?.lg ?? undefined}
              >
                {Children.map(children, (field) => {
                  return field &&
                    isValidElement(field) &&
                    field.key === column.id ? (
                    <Labeled
                      key={column.id}
                      className={"ra-field"}
                      style={{ width: "100%" }}
                    >
                      {field}
                    </Labeled>
                  ) : null;
                })}
              </Grid>
            ))}
          </Grid>
        ))}
      </Stack>
    </Root>
  );
};

export default LayoutGenerator;
