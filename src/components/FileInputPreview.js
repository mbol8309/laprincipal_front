import * as React from "react";
import { styled } from "@mui/material/styles";
import { useEffect, ReactNode } from "react";
import PropTypes from "prop-types";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import { useTranslate } from "ra-core";
import get from "lodash/get";
import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";

export const FileInputPreview = (props) => {
  const { children, className, onRemove, file, title, ...rest } = props;

  const translate = useTranslate();
  const hasThumbnail = file?.thumbnail_path !== null;

  useEffect(() => {
    return () => {
      const preview = file.rawFile ? file.rawFile.preview : file.preview;

      if (preview) {
        window.URL.revokeObjectURL(preview);
      }
    };
  }, [file]);

  const fileTitleValue = get(file, title) || title;

  return (
    <Grid
      item
      className={className}
      {...rest}
      display="flex"
      style={{
        maxWidth: 150,
      }}
    >
      <Box display="flex">
        {onRemove && (
          <IconButton
            className={FileInputPreviewClasses.removeButton}
            onClick={onRemove}
            aria-label={translate("ra.action.delete")}
            title={translate("ra.action.delete")}
            size="small"
          >
            <RemoveCircle className={FileInputPreviewClasses.removeIcon} />
          </IconButton>
        )}
        {hasThumbnail ? (
          <Box
            display="flex"
            flexDirection={"column"}
            style={{
              maxWidth: 120,
            }}
          >
            <img
              src={file.thumbnail_path}
              alt={file.name}
              style={{
                maxWidth: 100,
                maxHeight: 100,
              }}
            />
            <Tooltip title={fileTitleValue}>
              <Typography noWrap>{fileTitleValue}</Typography>
            </Tooltip>
          </Box>
        ) : (
          fileTitleValue
        )}
      </Box>
    </Grid>
  );
};

FileInputPreview.propTypes = {
  className: PropTypes.string,
  file: PropTypes.object,
  onRemove: PropTypes.func,
};

FileInputPreview.defaultProps = {
  file: undefined,
};

const PREFIX = "RaFileInputPreview";

const FileInputPreviewClasses = {
  removeButton: `${PREFIX}-removeButton`,
  removeIcon: `${PREFIX}-removeIcon`,
};

const Root = styled("div", {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${FileInputPreviewClasses.removeButton}`]: {},

  [`& .${FileInputPreviewClasses.removeIcon}`]: {
    color: theme.palette.error.main,
  },
}));
