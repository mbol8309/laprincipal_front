import { useGetList, useGetOne } from "react-admin";
import data from "../providers/data"

const useFront = (item) => {
    return useGetOne("front", { id: item });
};
export default useFront;
