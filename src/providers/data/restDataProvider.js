import dataProvider from ".";
import instance from "../../api/instance";

const restDataProvider = {
    //----------------LIST
    getList: (resource, params) =>{
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;

        return instance.get(`${resource}`,{}).then(({data})=>{
            return {
                data: data?.data,
                total:data?.total
            }
        })
    },
    //-----------------ONE
    getOne:(resource,params) => {
        const {id} = params;
        return instance.get(`${resource}/${id}`,{
            model:resource,
            filters:{id}

        }).then(({data})=>{
            return {
                data:data.data
            };
        })
    }

}

export default restDataProvider