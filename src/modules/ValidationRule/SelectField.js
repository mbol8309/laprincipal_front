import { useMemo } from "react";
import { required, SelectInput } from "react-admin";
import { useWatch } from "react-hook-form";
import { useFront } from "../../api/useFront";
import SnakeCaseToPascalCase from "../../utils/SnakeCaseToPascalCase";

const SelectField = (props) => {
    const selectValue = useWatch({ name: "model_name" });
    const { isSuccess: isSuccessFields, data: dataFields } = useFront(
        `resources-${selectValue}`,
        {
            enabled: Boolean(selectValue),
        }
    );

    const fields = useMemo(() => {
        return (
            dataFields?.items?.fields?.map((f) => ({
                id: f.id,
                name: f.label ?? SnakeCaseToPascalCase(f.id),
            })) ?? []
        );
    }, [dataFields]);
    if (isSuccessFields) {
        return (
            <SelectInput
                source="field_name"
                choices={fields}
                label="Field Name"
                emptyText={"Select Field Value"}
                validate={required()}
            />
        );
    }
    return null;
};

export default SelectField