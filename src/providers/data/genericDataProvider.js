import dataProvider from ".";
import instance from "../../api/instance";
import { HttpError } from 'react-admin';

const stringifyErrors = (errors) => Object.values(errors).join();

const genericDataProvider = {
  //----------------LIST
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const {filter, meta} = params;
    const {field, order} = params.sort;
    let data = {
        model: resource,
        per_page: perPage,
        page,
        filters: filter,
        ...meta
      }
    if (params.sort){
        data.sort_by = `${field} ${order}`;
    }

    return instance
      .post("getAll",data )
      .then(({ data }) => {
        return {
          data: data?.data,
          total: data?.total,
        };
      });
  },
  //-----------------ONE
  getOne: (resource, params) => {
    const { id, meta } = params;
    return instance
      .post("getById", {
        model: resource,
        id,
        ...meta
      })
      .then(({ data }) => {
        return {
          data: data.data,
        };
      });
  },
  getMany: (resource, params) => {
    const {ids,meta} = params;
    return instance.post("getByIds", {
        model: resource,
        ids
    })
    .then(({ data }) => {
        return {
          data: data.data,
        };
      });
  },
  getManyReference: (resource, params) => {
    const {target, id, pagination, sort, filter, meta}=params;
    const { page, perPage } = pagination;
    let data = {
        model: resource,
        per_page: perPage,
        page,
        filters: {
            ...filter,
            [target]:id
        }
      }
    if (params.sort){
        const {field, order} = params.sort;
        data.sort_by = `${field} ${order}`;
    }

    return instance
      .post("getAll",data )
      .then(({ data }) => {
        return {
          data: data?.data,
          total: data?.total,
        };
      });
  },
  update: (resource, params) => {
    const { id, data, previousData, meta } = params;
    return instance
      .post("updateById", {
        model: resource,
        id,
        data,
      })
      .then(({ data }) => {
        return {
          data: data.data,
        };
      }).catch(({response})=>{
        console.log(response)
        throw new HttpError(stringifyErrors(response?.data?.errors),  response.status, "some wierd error")
      });
  },
  create: (resource, params) => {
    const { data, meta } = params;
    return instance
      .post("insert", {
        model: resource,
        data,
      })
      .then(({ data }) => {
        return {
          data: data.data,
        };
      }).catch(({response})=>{
        console.log(response)
        throw new HttpError(stringifyErrors(response?.data?.errors),  response.status, "some wierd error")
      });
  },
  delete: (resource, params) => {
    const {id, previousData, meta} = params
    return instance.post("delete", {
      model: resource,
      id,
    })
    .then(({ data }) => {
      return {
        data: data.data,
      };
    }).catch(({response})=>{
      console.log(response)
      throw new HttpError(stringifyErrors(response?.data?.errors),  response.status, "some wierd error")
    });

  }
};

export default genericDataProvider;
