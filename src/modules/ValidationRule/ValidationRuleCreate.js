import { useMemo, useState } from "react";
import { Create, Edit, required, SelectInput, SimpleForm, TextInput } from "react-admin";
import { useFront } from "../../api/useFront";
import SnakeCaseToPascalCase from "../../utils/SnakeCaseToPascalCase";
import { useWatch } from "react-hook-form";
import SelectField from "./SelectField";



const ValidationRuleCreate = (props) => {
    const { isSuccess: isSuccessResources, data: dataResources } =
        useFront("resources");

    const resources = useMemo(
        () =>
            dataResources?.items?.map((r) => {
                let v = SnakeCaseToPascalCase(r.id);
                return {
                    id: r.id,
                    name: v,
                };
            }) ?? [],
        [dataResources]
    );

    return (
        <Create>
            <SimpleForm>
                {isSuccessResources && (
                    <SelectInput
                        source="model_name"
                        choices={resources}
                        label="Model Name"
                        emptyText={"Select Model name"}
                        validate={required()}
                    />
                )}
                <SelectField />
                <TextInput source="rule_name" validate={required()}/>
                <TextInput source="rule_parameters"/>
            </SimpleForm>
        </Create>
    );
}

export default ValidationRuleCreate