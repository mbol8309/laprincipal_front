import { useGetList, useGetOne } from "react-admin"

const useFront = (item) => {
    return useGetOne('front',{id:item});
}
export default useFront