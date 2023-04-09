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
import { useResourceContext } from "react-admin";
import { useMutation } from "react-query";
import instance from "../../api/instance";
import evaluateString from "../../utils/evaluateString";
import {
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { stringifyErrors } from "../../utils";

const LocalActionEndpoint = ({ open, onClose, record, data, ...other }) => {
  const resource = useResourceContext();
  const [localOpen, setLocalOpen] = useState(false);
  const recordID = useMemo(() => {
    return record?.id;
  }, [record]);

  const endpoint = useMemo(() => {
    return data?.endpoint;
  }, [data]);

  const {
    mutate,
    isLoading,
    data: queryData,
    isSuccess,
    isError,
    isIdle,
    error,
  } = useMutation(
    ["action", resource, recordID, endpoint],
    (_data) =>
      instance.post("action", {
        model: _data.resource,
        id: _data.id,
        action: _data.endpoint,
      })
    // {
    //   select: (data) => {
    //     console.log(data);
    //     return data?.data?.data;
    //   },
    // }
  );

  const handleClose = () => {
    if (!isIdle && !isLoading) {
      setLocalOpen(false);
      onClose && onClose();
    }
  };

  const actionTitle = useMemo(() => {
    if (recordID && resource) {
      if (!data?.dialogTitle) return `Action on ${resource}#${recordID}`;
      let f = evaluateString(data.dialogTitle);
      return f(record);
    }
    return null;
  }, [data, resource, recordID]);

  useEffect(() => {
    if (open && resource && recordID && endpoint) {
      setLocalOpen(open);
      mutate({ resource, id: recordID, endpoint });
    }
  }, [resource, recordID, endpoint, mutate, open]);

  return (
    <Dialog open={localOpen} onClose={handleClose}>
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
      </DialogContent>
    </Dialog>
  );
};

export default LocalActionEndpoint;
