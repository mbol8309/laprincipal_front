import { Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import {
  AutocompleteArrayInput,
  Button,
  ChoicesContextProvider,
  Edit,
  RecordContextProvider,
  ReferenceArrayInput,
  ResourceContextProvider,
  SelectArrayInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useEditContext,
  useGetList,
  useGetManyReference,
  useGetOne,
  useGetRecordId,
  useRecordContext,
  useResourceContext,
} from "react-admin";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

const RolePermissionEdit = (props) => {
  const record = useRecordContext();
  const resource = useResourceContext();

  const dataprovider = useDataProvider();

  const {
    data = [],
    total,
    isLoading,
    error,
    refetch,
  } = useGetManyReference("permission", {
    target: "role_has_permissions.role_id",
    id: record?.id,
  });

  const {
    data: ReferenceData,
    isLoading: isLoadingReference,
    error: errorReference,
  } = useGetList("permission");

  const { control } = useFormContext();

  console.log(data);
  return (
    <ChoicesContextProvider
      value={{
        allChoices: ReferenceData,
        isLoading: isLoadingReference,
        error: errorReference,
        source: "role_has_permissions.permission_id",
        resource: "role_has_permissions.permission_id",
      }}
    >
      <Controller
        control={control}
        value={data}
        name="role_has_permissions.permission_id"
        render={({ field }) => (
          <SelectArrayInput {...field} label="Permissions" />
        )}
      />
    </ChoicesContextProvider>
  );
};

const RoleEdit = (props) => {
  const navigate = useNavigate();
  // const {
  //   data: ReferenceData,
  //   isLoading: isLoadingReference,
  //   error: errorReference,
  // } = useGetList("permission");

  // const recordID = useGetRecordId();
  // const { data: record } = useGetOne("role", {
  //   id: recordID,
  //   meta: {
  //     with: "role_has_permissions.permissions",
  //   },
  // });

  // const reformedRecord = useMemo(() => {
  //   return {
  //     ...record,
  //     "role_has_permissions.permissions": record?.role_has_permissions?.map(
  //       (curr) => curr?.permissions.id
  //     ),
  //   };
  // }, [record]);

  // console.log(reformedRecord);

  // const resource = useResourceContext();
  // console.log(resource);

  return (
    <Fragment>
      <Button onClick={() => navigate(-1)}>
        <Typography>Back</Typography>
      </Button>
      <Edit
        queryOptions={{
          meta: { with: ["permissions"] },
          select: (data) => {
            return {
              ...data,
              permissions: data?.permissions?.map((curr) => curr?.id),
            };
          },
        }}
        // transform={transform}
      >
        <SimpleForm>
          <TextInput source={"name"} label={"Name"} />
          <ReferenceArrayInput
            source="permissions"
            label="Permissions"
            reference="permission"
          >
            <AutocompleteArrayInput
              optionText={"name"}
              filterToQuery={(searchText) => ({ name: searchText })}
            />
          </ReferenceArrayInput>
        </SimpleForm>
      </Edit>
    </Fragment>
  );
};

export default RoleEdit;
