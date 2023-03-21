import { LinearProgress } from "@mui/material";
import { useMemo } from "react";
import { Datagrid, DateField, EmailField, List, ListGuesser, ReferenceField, TextField, TextInput, useResourceContext } from "react-admin"
import { useFront } from "../api/useFront"
import getParsedFilters from "../utils/getParsedFilters";

const GenericList = () => {
    const resource = useResourceContext()
    const {isLoading, isSuccess, data:description} = useFront(`resources-${resource}_list`);

    const resourceDescription = useMemo(()=>{
        if(description){
            return description.items
        }
        return null;
    },[description])

    const filters = useMemo(()=>{
        let filters = getParsedFilters(resourceDescription?.filters)
        console.log('filters',filters)
        return filters
    },[resourceDescription])

    if (isLoading){
        return <LinearProgress/>
    }

    

    if (isSuccess){
        return (
            <List filters={filters}>
                <Datagrid rowClick={resourceDescription?.rowClick ?? "edit" }>
                    {
                        resourceDescription?.items?.map(i=>{
                            switch(i.type){
                                case "textfield":
                                    return <TextField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                                case "emailfield":
                                    return <EmailField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                                case "datefield":
                                    return <DateField source={i.id} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                                case "reference":
                                    return <ReferenceField source={'author_id'} reference={'author'} key={i.id} sortable={Boolean(i?.sort)} label={i?.label ?? undefined}/>
                                default:
                                    return null;
                            }
                        })
                    }
                </Datagrid>
            </List>
        )
    }

    return null;
}

export default GenericList
