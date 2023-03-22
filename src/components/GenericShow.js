import { useMemo } from "react";
import { DateField, EmailField, LinearProgress, ReferenceField, ReferenceManyField, Show, ShowGuesser, SimpleShowLayout, TextField, useResourceContext } from "react-admin"
import { useFront } from "../api/useFront";

const GenericShow = () => {
    const resource = useResourceContext()
    const {isLoading, isSuccess, data:description} = useFront(`resources-${resource}_show`);

    const resourceDescription = useMemo(()=>{
        if(description){
            return description.items
        }
        return null;
    },[description])

    if (isLoading){
        return <LinearProgress/>
    }

    if (isSuccess){

        if (resourceDescription?.type === 'simple'){
            return (
                <Show>
                    <SimpleShowLayout>
                    {
                        resourceDescription?.items?.map(i=>{
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
                                    return <ReferenceManyField target={i.id} reference={i.reference} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                                default:
                                    return null;
                            }
                        })
                    }
                    </SimpleShowLayout>
                </Show>
            )
        }

        
    }
    return null;
}

export default GenericShow