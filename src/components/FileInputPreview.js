import * as React from "react";
import { styled } from "@mui/material/styles";
import { useEffect, ReactNode } from "react";
import PropTypes from "prop-types";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import { useTranslate } from "ra-core";
import get from "lodash/get";
import {
  Box,
  Grid,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

export const FileInputPreview = ({
  children,
  className,
  onRemove,
  file,
  title,
  showBar = false,
  allowCrop = false,
  maxWidth=100,
  maxHeight=100,
  onCrop,
  ...rest
}) => {
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
        maxWidth: maxWidth,
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
              maxWidth: maxWidth,
            }}
          >
            <ImageListItem>
              <img
                src={file.cropped ?? file.thumbnail_path}
                alt={file.name}
                style={{
                  maxWidth: maxWidth,
                  maxHeight: maxHeight,
                }}
                loading="lazy"
              />
              {showBar && <ImageListItemBar title={fileTitleValue} 
              actionIcon={allowCrop && 
              <IconButton
              sx={{color:'rgba(255, 255, 255, 0.54)'}}
              onClick={()=>onCrop && onCrop(file)}
              >
                <EditIcon/>
              </IconButton>}/>}
            </ImageListItem>
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
