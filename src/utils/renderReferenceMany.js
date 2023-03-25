import { ChipField, Datagrid, DateField, DateInput, EmailField, ReferenceField, ReferenceInput, ReferenceManyField, SimpleFormIterator, SimpleShowLayout, SingleFieldList, TextField, TextInput } from "react-admin";
import { ReferenceManyInput } from "../components/ReferenceManyInput";


const renderReferenceMany = (field,edit=false) => {
  if (field == null || field === undefined) {
    return null;
  }

  const InnerTextField = edit ? TextInput : TextField
  const InnerEmailField = edit ? TextInput : EmailField
  const InnerDateField = edit ? DateInput : DateField
  const InnerReferenceField = edit ? ReferenceInput : ReferenceField
  const InnerReferenceManyField = edit ? ReferenceManyField : ReferenceManyField



  console.log(field);

  switch (field.type) {
    case "single":
      return (
        <SingleFieldList>
            {
                field.component == "chip" &&
                <ChipField source={field.source} />
            }
          
        </SingleFieldList>
      );
      case "datagrid":
        return (
            <Datagrid rowClick={field?.rowClick ?? "edit" }
            bulkActionButtons={Boolean(field.bulkActions)}>
            {
                field?.items?.map(i=>{
                    switch(i.type){
                        case "textfield":
                            return <InnerTextField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "emailfield":
                            return <InnerEmailField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "datefield":
                            return <InnerDateField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "reference":
                            return <InnerReferenceField source={i.id} reference={i.reference} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "reference_many":
                            return <InnerReferenceManyField target={i.id} reference={i.reference} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}>
                                {renderReferenceMany(i.render,edit)}

                            </InnerReferenceManyField>
                        default:
                            return null;
                    }
                })
            }
        </Datagrid>
        );
        case "iterator":
            console.log(field);
        return (
            <SimpleFormIterator>
            {
                field?.items?.map(i=>{
                    switch(i.type){
                        case "textfield":
                            return <InnerTextField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "emailfield":
                            return <InnerEmailField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "datefield":
                            return <InnerDateField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "reference":
                            return <InnerReferenceField source={i.id} reference={i.reference} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "reference_many":
                            return <InnerReferenceManyField target={i.id} reference={i.reference} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}>
                                {renderReferenceMany(i.render,edit)}

                            </InnerReferenceManyField>
                        default:
                            return null;
                    }
                })
            }
        </SimpleFormIterator>
        );
        case "simple":
            return (
                <SimpleShowLayout>
                    {
                        field?.items?.map(i=>{
                            switch(i.type){
                                case "textfield":
                                    return <TextField source={i.id} key={i.id} label={i?.label ?? undefined}/>
                                case "emailfield":
                                    return <EmailField source={i.id} key={i.id} label={i?.label ?? undefined}/>
                                case "datefield":
                                    return <DateField source={i.id} key={i.id} label={i?.label ?? undefined}/>
                                case "reference":
                                    return <ReferenceField source={i.id} reference={i.reference} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                                case "reference_many":
                                    return <ReferenceManyField target={i.id} reference={i.reference} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}>
                                        {renderReferenceMany(i.render)}
                                    </ReferenceManyField>
                                default:
                                    return null;
                            }
                        })
                    }
                    </SimpleShowLayout>
            )
    default:
        return null;
  }
};

export default renderReferenceMany;
