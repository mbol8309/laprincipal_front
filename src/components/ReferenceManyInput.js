import {
    ArrayInputContext,
  ListContextProvider,
  ReferenceArrayInput,
  ResourceContextProvider,
  useRecordContext,
  useReferenceManyFieldController,
} from "react-admin";

export const ReferenceManyField = (props) => {
  const {
    children,
    filter,
    page = 1,
    pagination = null,
    perPage,
    reference,
    resource,
    sort,
    source,
    target,
  } = props;
  const record = useRecordContext(props);

  const controllerProps = useReferenceManyFieldController({
    filter,
    page,
    perPage,
    record,
    reference,
    resource,
    sort,
    source,
    target,
  });

  return (
    <ResourceContextProvider value={reference}>
      <ListContextProvider value={controllerProps}>
        {children}
        {pagination}
      </ListContextProvider>
    </ResourceContextProvider>
  );
};
export const ReferenceManyInput = (props) => {
  const {
    children,
    filter,
    page = 1,
    pagination = null,
    perPage,
    reference,
    resource,
    sort,
    source = "id",
    target,
  } = props;
  const record = useRecordContext(props);

  const controllerProps = useReferenceManyFieldController({
    filter,
    page,
    perPage,
    record,
    reference,
    resource,
    sort,
    source,
    target,
  });

  console.log(controllerProps)
  return "Not implemented yet"


  return (
    <ResourceContextProvider value={reference}>
        <ArrayInputContext value={controllerProps.data}>
        {children}
      </ArrayInputContext>
    </ResourceContextProvider>
  );
};
