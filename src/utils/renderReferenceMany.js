import { ChipField, Datagrid, DateField, EmailField, ReferenceField, ReferenceManyField, SimpleShowLayout, SingleFieldList, TextField } from "react-admin";


const renderReferenceMany = (field,edit=false) => {
  if (field == null || field === undefined) {
    return null;
  }


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
                            return <TextField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "emailfield":
                            return <EmailField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                        case "datefield":
                            return <DateField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
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
        </Datagrid>
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
