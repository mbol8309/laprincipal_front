import simpleRestProvider from "ra-data-simple-rest";
import { BACKEND_URL } from "../../configs";
import genericDataProvider from "./genericDataProvider";
import restDataProvider from "./restDataProvider";
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    GET_MANY,
    GET_MANY_REFERENCE,
  } from 'react-admin';

const dataProviders = [
  { dataProvider: restDataProvider, resource: ["setting"] },
  { dataProvider: genericDataProvider, resource: [] },
];

const dp = (type, resource, params) => {
  const dpmapping = dataProviders.find((dp) => dp.resource.includes(resource));

  const mappingType = {
    [GET_LIST]: 'getList',
    [GET_ONE]: 'getOne',
    [GET_MANY]: 'getMany',
    [GET_MANY_REFERENCE]: 'getManyReference',
    [CREATE]: 'create',
    [UPDATE]: 'update',
    [UPDATE_MANY]: 'updateMany',
    [DELETE]: 'delete',
  };

  return dpmapping
    ? dpmapping.dataProvider[mappingType[type]](resource, params)
    : genericDataProvider[mappingType[type]](resource, params);
};

export default dp;
