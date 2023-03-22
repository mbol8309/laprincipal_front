import dataProvider from ".";
import instance from "../../api/instance";

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
        filters: filter
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
        id
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
      });
  },
};

export default genericDataProvider;
