import { ChipField, SingleFieldList } from "react-admin";


const renderReferenceMany = (field) => {
  if (field == null || field === undefined) {
    return null;
  }

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
    default:
        return null;
  }
};

export default renderReferenceMany;
