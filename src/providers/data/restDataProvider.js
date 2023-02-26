import dataProvider from ".";
import instance from "../../api/instance";

const restDataProvider = {
    //----------------LIST
    getList: (resource, params) =>{
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;

        return instance.post(`${resource}`,{}).then(({data})=>{
            return {
                data: data?.data,
                total:data?.total
            }
        })
    },
    //-----------------ONE
    getOne:(resource,params) => {
        const {id} = params;
        return instance.post(`${resource}/${id}`,{
            model:resource,
            filters:{id}

        }).then(({data})=>{
            return {
                data:data.data[0]
            };
        })
    }

}

export default restDataProvider