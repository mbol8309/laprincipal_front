import dataProvider from ".";
import instance from "../../api/instance";

const customDataProvider = {
    //----------------LIST
    getList: (resource, params) =>{
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;

        return instance.post('query',{
            model:resource,
            per_page: perPage,
            page,
            field, order
        }).then(({data})=>{
            return {
                data: data?.data,
                total:data?.total
            }
        })
    },
    //-----------------ONE
    getOne:(resource,params) => {
        const {id} = params;
        return instance.post('query',{
            model:resource,
            filters:{id}

        }).then(({data})=>{
            return {
                data:data.data[0]
            };
        })
    }

}

export default customDataProvider