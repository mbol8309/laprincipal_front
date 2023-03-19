import { LinearProgress } from "@mui/material";
import { useMemo } from "react";
import { Datagrid, DateField, EmailField, List, ListGuesser, TextField, useResourceContext } from "react-admin"
import { useFront } from "../api/useFront"

const GenericList = () => {
    const resource = useResourceContext()
    const {isLoading, isSuccess, data:description} = useFront(`resources-${resource}_list`);

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
        return (
            <List>
                <Datagrid rowClick={resourceDescription?.rowClick ?? "edit" }>
                    {
                        resourceDescription?.items?.map(i=>{
                            switch(i.type){
                                case "textfield":
                                    return <TextField source={i.id} key={i.id}/>
                                case "emailfield":
                                    return <EmailField source={i.id} key={i.id}/>
                                case "datefield":
                                    return <DateField source={i.id} key={i.id}/>
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
