import dataProvider from ".";
import instance from "../../api/instance";

function removeKeys(obj, keysToRemove) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keysToRemove.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

const fileDataProvider = {
  //----------------LIST
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const id = params.filter.id;
    const model = params.filter.model

    return instance.post('file/getAll', {
      model:model,
      id:id,
      filters:removeKeys(params.filter,['id','model'])
    }).then(({ data }) => {
      return {
        data: data?.data,
        total: data?.total,
      };
    });
  },
  create:(resource, params) =>{
    const {data} = params;
    const alreadyUploaded = data.filter(d=>!Boolean(d.rawFile)).map(d=>d.id);
    const toUpload = data.filter(d=>Boolean(d.rawFile));
    const promises = toUpload.map(file=>{
      let fm = new FormData();
      fm.append('file',file.rawFile);
      fm.append('function',file.function)
      return instance.post('file/upload', fm,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    })
    return Promise.all(promises).then((results) =>{
      let newIds = results.map(r=>r.data.id);
      return [...newIds,...alreadyUploaded]
    })

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

export default fileDataProvider;
