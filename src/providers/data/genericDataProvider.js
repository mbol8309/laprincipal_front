import dataProvider from ".";
import instance from "../../api/instance";

const genericDataProvider = {
  //----------------LIST
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    return instance
      .post("getAll", {
        model: resource,
        per_page: perPage,
        page,
        field,
        order,
      })
      .then(({ data }) => {
        return {
          data: data?.data,
          total: data?.total,
        };
      });
  },
  //-----------------ONE
  getOne: (resource, params) => {
    const { id, ...filters } = params;
    return instance
      .post("getById", {
        model: resource,
        id,
        ...filters,
      })
      .then(({ data }) => {
        return {
          data: data.data,
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
