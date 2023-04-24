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

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const fileDataProvider = {
  //----------------LIST
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const id = params.filter.id;
    const model = params.filter.model;

    return instance
      .post("file/getAll", {
        model: model,
        id: id,
        filters: removeKeys(params.filter, ["id", "model"]),
      })
      .then(({ data }) => {
        return {
          data: data?.data,
          total: data?.total,
        };
      });
  },
  create: async (resource, params) => {
    const { data } = params;
    /*data:{
      function1:[
        {file1},{file2}
      ],
      function2:[
        {file3,file4}
      ]
    }
    */
    const flattedList = Object.values(data).reduce((prev, curr) => [
      ...prev,
      ...curr,
    ]); //this flatten this to a list of files

    const alreadyUploaded = flattedList
      .filter((d) => !Boolean(d.rawFile))
      .map((d) => d.id);
    const toUpload = flattedList.filter(
      (d) => Boolean(d.rawFile) || Boolean(d.cropped)
    );
    const promises = toUpload.map(async (file) => {
      let fm = new FormData();
      if (file.cropped) {
        //was cropped
        const response = await fetch(file.cropped);
        const blob = await response.blob();
        fm.append('file',blob,file.name);
      } else {
        fm.append("file", file.rawFile);
      }
      fm.append("function", file.function);
      return instance.post("file/upload", fm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    });
    return Promise.all(promises).then((results) => {
      let newIds = results.map((r) => r.data.id);
      return [...newIds, ...alreadyUploaded];
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

export default fileDataProvider;
