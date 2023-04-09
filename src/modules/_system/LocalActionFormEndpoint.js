import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Form, useResourceContext } from "react-admin";
import { useMutation } from "react-query";
import instance from "../../api/instance";
import evaluateString from "../../utils/evaluateString";
import {
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { stringifyErrors } from "../../utils";
import FormGenericGenerator from "../../components/FormGenericGenerator";
import { useForm } from "react-hook-form";

const LocalActionFormEndpoint = ({ open, onClose, record, data, ...other }) => {
  const resource = useResourceContext();
  
  const recordID = useMemo(() => {
    return record?.id;
  }, [record]);

  const endpoint = useMemo(() => {
    return data?.endpoint;
  }, [data]);

  const fields = useMemo(() => {
    return data?.fields;
  }, [data]);

  const type = useMemo(() => {
    return data?.type;
  }, [data]);

  const {
    mutate,
    isLoading,
    data: queryData,
    isSuccess,
    isError,
    isIdle,
    error,
    reset
  } = useMutation(
    ["action", resource, recordID, endpoint],
    ({ resource, id, action, ...other }) =>
      instance.post("action", {
        model: resource,
        id,
        action,
        ...other,
      })
    // {
    //   select: (data) => {
    //     console.log(data);
    //     return data?.data?.data;
    //   },
    // }
  );

  const handleClose = () => {
    if (!isLoading) {
      onClose && onClose();
      reset()
    }
  };

  const actionTitle = useMemo(() => {
    if (recordID && resource && record) {
      if (!data?.dialogTitle) return `Action on ${resource}#${recordID}`;
      let f = evaluateString(data.dialogTitle);
      return f(record);
    }
    return null;
  }, [data, resource, recordID, record]);

  // useEffect(() => {
  //   if (open && resource && recordID && endpoint) {
  //     setLocalOpen(open);
  //     mutate({ resource, id: recordID, endpoint });
  //   }
  // }, [resource, recordID, endpoint, mutate, open]);

  const onSubmit = (data) => {
    mutate({
      id: recordID,
      resource,
      action: endpoint,
      data,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{actionTitle}</DialogTitle>
      <DialogContent>
        {isLoading && (
          <Stack>
            <CircularProgress
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                marginBottom: "1vh",
              }}
            />
          </Stack>
        )}
        {isSuccess && (
          <Stack>
            <CheckCircleIcon
              htmlColor="#008000"
              fontSize="large"
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                marginBottom: "1vh",
              }}
            />
            <Typography>{queryData?.data?.message}</Typography>
          </Stack>
        )}
        {isError && (
          <Stack>
            <CancelIcon
              htmlColor="#800000"
              fontSize="large"
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                marginBottom: "1vh",
              }}
            />
            <Typography>
              {stringifyErrors(
                error?.response?.data?.errors ?? ["Unknown error"]
              )}
            </Typography>
          </Stack>
        )}
        {isIdle && (
          <FormGenericGenerator
            fields={fields}
            type={type}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LocalActionFormEndpoint;
