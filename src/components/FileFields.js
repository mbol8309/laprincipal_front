import styled from "@emotion/styled";
import { LinearProgress, Link, Typography } from "@mui/material";
import get from "lodash/get";
import {
  sanitizeFieldRestProps,
  useGetList,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from "react-admin";

const FileField = ({
  source,
  label,
  className,
  emptyText,
  count = 1,
  title,
  target,
  download,
  ping,
  rel,
  ...rest
}) => {
  const resource = useResourceContext();
  const record = useRecordContext();
  const translate = useTranslate();

  const { data, total, isLoading, error, refetch, isSuccess } = useGetList("file", {
    filter: {
      id: record.id,
      function: source,
      model: resource,
    },
  });

  if (isLoading){
    return (<LinearProgress/>)
  }

    if (!data?.length === 0) {
    return emptyText ? (
      <Typography
        component="span"
        variant="body2"
        className={className}
        {...sanitizeFieldRestProps(rest)}
      >
        {emptyText && translate(emptyText, { _: emptyText })}
      </Typography>
    ) : (
      <Root className={className} {...sanitizeFieldRestProps(rest)} />
    );
  }

  if (count > 1) {
    return (
      <StyledList className={className} {...sanitizeFieldRestProps(rest)}>
        {isSuccess && data.map((file, index) => {
          const fileTitleValue = get(file, title) || title;
          const srcValue = get(file, "path") || title;
          const hasThumbnail = file?.thumbnail_path !== null;
          return (
            <li key={index}>
              <Link
                href={srcValue}
                title={fileTitleValue}
                target={target}
                download={download}
                ping={ping}
                rel={rel}
                variant="body2"
              >
                {hasThumbnail ? (
                  <img src={file.thumbnail_path} alt={file.name} />
                ) : (
                  fileTitleValue
                )}
              </Link>
            </li>
          );
        })}
      </StyledList>
    );
  }

  if (count === 1 && data?.length > 0) {
    const _data = data[0];
    const hasThumbnail = _data?.thumbnail_path !== null;
    const titleValue = get(_data, title) || title;
    return (
      <Root className={className} {...sanitizeFieldRestProps(rest)}>
        <Link
          href={_data?.path}
          title={titleValue}
          target={target}
          download={download}
          ping={ping}
          rel={rel}
          variant="body2"
        >
          {hasThumbnail ? (
            <img src={_data.thumbnail_path} alt={_data.name} />
          ) : (
            titleValue
          )}
        </Link>
      </Root>
    );
  }

  // return (
  //   <Typography
  //     component="span"
  //     variant="body2"
  //     className={className}
  //     {...sanitizeFieldRestProps(rest)}
  //   >
  //     {isLoading && <LinearProgress />}
  //     {JSON.stringify(data)}
  //     {/* {value != null && typeof value !== 'string'
  //               ? JSON.stringify(value)
  //               : value || emptyText} */}
  //   </Typography>
  // );
};

const PREFIX = "RaFileField";

const Root = styled("div", {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})({
  display: "inline-block",
});

const StyledList = styled("ul")({
  display: "inline-block",
});

export default FileField;
