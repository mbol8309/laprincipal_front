import dataProvider from ".";
import instance from "../../api/instance";

const restDataProvider = {
  //----------------LIST
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    return instance.get(`${resource}`, {}).then(({ data }) => {
      return {
        data: data?.data,
        total: data?.total,
      };
    });
  },
  //-----------------ONE
  getOne: (resource, params) => {
    const { id } = params;
    return instance
      .get(`${resource}/${id}`, {
        model: resource,
        filters: { id },
      })
      .then(({ data }) => {
        return {
          data: data.data,
        };
      });
  },
  //---------------------UPDATE
  update: (resource, params) => {
    const { id, data } = params;
    return instance.post(`${resource}/${id}`, data).then(({ data: result }) => {
      return {
        data: result.data,
      };
    });
  },
};

export default restDataProvider;
