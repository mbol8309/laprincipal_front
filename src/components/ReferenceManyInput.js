import {
  ArrayInputContext,
  ChoicesContextProvider,
  ListContextProvider,
  RecordContextProvider,
  ReferenceArrayField,
  ReferenceArrayInput,
  ResourceContextProvider,
  SelectArrayInput,
  SimpleFormIterator,
  TextInput,
  useChoicesContext,
  useGetList,
  useRecordContext,
  useReferenceManyFieldController,
  useResourceContext,
} from "react-admin";
import { Controller, useForm } from "react-hook-form";

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
  const { control } = useForm();

  const {
    data: ReferenceData,
    isLoading: isLoadingReference,
    error: errorReference,
  } = useGetList(reference);

  const { isSuccess, isLoading, error, data } = useReferenceManyFieldController(
    {
      filter,
      page,
      perPage,
      record,
      reference,
      resource,
      sort,
      source,
      target,
    }
  );

  console.log(data);

  return (
    <ResourceContextProvider value={reference}>
      <SimpleFormIterator inline>
      {/* <ChoicesContextProvider
        value={{
          allChoices: ReferenceData,
          isLoading: isLoadingReference,
          error: errorReference,
          source,
          resource: reference,
        }}
      >
        <Controller
          control={control}
          name="books"
          defaultValue={data?.map((d) => d.id)}
          render={() => (
            <SelectArrayInput optionText={"title"} />
          )}
        />
      </ChoicesContextProvider> */}
      </SimpleFormIterator>
    </ResourceContextProvider>
  );
};
