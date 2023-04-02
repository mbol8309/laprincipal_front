import { useMemo, useState } from "react";
import { Edit, required, SelectInput, SimpleForm, TextInput } from "react-admin";
import { useFront } from "../../api/useFront";
import SnakeCaseToPascalCase from "../../utils/SnakeCaseToPascalCase";
import { useWatch } from "react-hook-form";
import SelectField from "./SelectField";

const ValidationRuleEdit = (props) => {
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
        <Edit>
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
        </Edit>
    );
};

export default ValidationRuleEdit;
