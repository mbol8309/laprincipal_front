import { useEffect, useState } from "react";
import { GET_ONE, useGetList, useGetOne } from "react-admin";
import dataProvider from "../providers/data";

export const useFront = (item,options={}) => {
  return useGetOne("front", { id: item },options);
};
export const useFront2 = (item, queryClient) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const _d = await queryClient.fetchQuery(["front", item], () =>
      dataProvider(GET_ONE, "front", { id: item })
      );
      setData(_d.data);
      setIsSuccess(true);
    } catch (e) {
      setIsSuccess(false);
      setData({});
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadData()
  },[]);
  return { data, isSuccess, isLoading };
};
