import styled from "@emotion/styled";
import { FormHelperText, Grid } from "@mui/material";
import get from "lodash/get";
import { Children, ReactElement, isValidElement, useMemo } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import clsx from "clsx";

import {
  FileInputClasses,
  InputHelperText,
  Labeled,
  RecordContextProvider,
  isRequired,
  sanitizeFieldRestProps,
  sanitizeInputRestProps,
  shallowEqual,
  useGetList,
  useInput,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from "react-admin";
import { FileInputPreview } from "./FileInputPreview";
import { useController } from "react-hook-form";

const images_types = ["application/jpg", "application/png"];
const other_types = ["application/pdf"];

const FileInput = ({
  source,
  label,
  accept,
  className,
  emptyText,
  count = 1,
  title,
  target,
  format,
  download,
  ping,
  rel,
  children,
  helperText,
  inputProps: inputPropsOptions,
  maxSize,
  minSize,
  labelMultiple = "ra.input.file.upload_several",
  labelSingle = "ra.input.file.upload_single",
  options = {},
  onRemove: onRemoveProp,
  parse,
  placeholder,
  validate,
  validateFileRemoval,
  ...rest
}) => {
  const resource = useResourceContext();
  const record = useRecordContext();
  const translate = useTranslate();
  const { onDrop: onDropProp } = options;

  const {
    data,
    total,
    isLoading,
    error: errorData,
    refetch,
    isSuccess,
  } = useGetList("file", {
    filter: {
      id: record.id,
      function: source,
      model: resource,
    },
  });

  const transformFile = (file) => {
    if (!(file instanceof File)) {
      return file;
    }
    console.log(file);
    const type = file.type;
    let preview = null;
    if (images_types.includes(type)) {
      preview = URL.createObjectURL(file);
    } else if (other_types.includes(type)) {
      preview = `/icons/${type.replace(/\//g, "-")}.png`;
    } else {
      preview = "/icons/generic.png";
    }
    const transformedFile = {
      rawFile: file,
      thumbnail_path: preview,
      name: file.name,
    };

    return transformedFile;
  };

  const multiple = useMemo(() => {
    return count > 1;
  }, [count]);

  const transformFiles = (files) => {
    if (!files) {
      return multiple ? [] : null;
    }

    if (Array.isArray(files)) {
      return files.map(transformFile);
    }

    return transformFile(files);
  };

  //   const { field: {onChange, value}, fieldState, formState:{isSubmitted} } = useController({
  //     name: source,
  //     defaultValue: data,
  //     // rules: {
  //     //     validate: async value => {
  //     //         if (!sanitizedValidate) return true;
  //     //         const error = await sanitizedValidate(
  //     //             value,
  //     //             formContext.getValues(),
  //     //             props
  //     //         );

  //     //         if (!error) return true;
  //     //         return getValidationErrorMessage(error);
  //     //     },
  //     // },
  //     ...options,
  // });

  const {
    id,
    field: { onChange, value },
    fieldState,
    formState: { isSubmitted },
    isRequired,
  } = useInput({
    format: format || transformFiles,
    parse: parse || transformFiles,
    source,
    validate,
    defaultValue: data,
    ...rest,
  });
  const { isTouched, error, invalid } = fieldState;
  const files = value;
  console.log(value);

  const onDrop = (newFiles, rejectedFiles, event) => {
    const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles];

    if (multiple) {
      onChange(updatedFiles);
    } else {
      onChange(updatedFiles[0]);
    }

    if (onDropProp) {
      onDropProp(newFiles, rejectedFiles, event);
    }
  };

  const onRemove = (file) => async () => {
    if (validateFileRemoval) {
      try {
        await validateFileRemoval(file);
      } catch (e) {
        return;
      }
    }
    if (multiple) {
      const filteredFiles = files.filter(
        (stateFile) => !shallowEqual(stateFile, file)
      );
      onChange(filteredFiles);
    } else {
      onChange(null);
    }

    if (onRemoveProp) {
      onRemoveProp(file);
    }
  };

  // const childrenElement =
  //   children && isValidElement(Children.only(children))
  //     ? Children.only(children)
  //     : undefined;

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxSize,
    minSize,
    multiple,
    ...options,
    onDrop,
  });

  return (
    <StyledLabeled
      htmlFor={id}
      label={label}
      className={clsx("ra-input", `ra-input-${source}`, className)}
      source={source}
      resource={resource}
      isRequired={isRequired}
      color={(isTouched || isSubmitted) && invalid ? "error" : undefined}
      {...sanitizeInputRestProps(rest)}
    >
      <>
        <div
          {...getRootProps({
            className: FileInputClasses.dropZone,
            "data-testid": "dropzone",
          })}
        >
          <input
            id={id}
            name={id}
            {...getInputProps({
              ...inputPropsOptions,
            })}
          />
          {placeholder ? (
            placeholder
          ) : multiple ? (
            <p>{translate(labelMultiple)}</p>
          ) : (
            <p>{translate(labelSingle)}</p>
          )}
        </div>
        <FormHelperText error={(isTouched || isSubmitted) && invalid}>
          <InputHelperText
            touched={isTouched || isSubmitted}
            error={error?.message}
            helperText={helperText}
          />
        </FormHelperText>
        {children && (
          <Grid container>
            {files?.map((file, index) => (
              <FileInputPreview
                key={index}
                file={file}
                onRemove={onRemove(file.path)}
                className={FileInputClasses.removeButton}
                title={title}
              >
                {/* <RecordContextProvider value={record}>
                  {childrenElement}
                </RecordContextProvider> */}
              </FileInputPreview>
            ))}
          </Grid>
        )}
      </>
    </StyledLabeled>
  );
};

const PREFIX = "RaFileField";

const StyledLabeled = styled(Labeled, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  width: "100%",
  [`& .${FileInputClasses.dropZone}`]: {
    background: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    fontFamily: theme.typography.fontFamily,
    cursor: "pointer",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.getContrastText(theme.palette.background.default),
  },
  [`& .${FileInputClasses.removeButton}`]: {},
}));
const Root = styled("div", {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})({
  display: "inline-block",
});

const StyledList = styled("ul")({
  display: "inline-block",
});

export default FileInput;
