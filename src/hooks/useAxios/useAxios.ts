import { useCallback } from "react";
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import { atom, useAtom } from "jotai";

let axiosResponse: AxiosResponse;

const dataAtom = atom([]);
const loadingAtom = atom({});
const erroAtom = atom<AxiosError | unknown>(undefined);

const useAxios = () => {
  const [dataResponse, setDataResponse] = useAtom(dataAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [erro, setErro] = useAtom(erroAtom);

  const fetchData = useCallback(
    async ({ url, method, params, data = null }: AxiosRequestConfig) => {
      setDataResponse([]);
      try {
        axiosResponse = await axios({
          url: url,
          method: method,
          params: params,
          data: data,
          baseURL: `http://127.0.0.1:3333`,
          onUploadProgress: () => {
            setLoading(true);
          },
        });
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          setDataResponse([]);
          setErro(err);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      } finally {
        if (axiosResponse && axiosResponse.status === 200) {
          setDataResponse(axiosResponse.data);
          setLoading(false);
        }
      }
    },
    [setDataResponse, setErro, setLoading]
  );

  return {
    axiosRequest: {
      fetchData,
      dataResponse,
      loading,
      erro,
    },
  };
};

export default useAxios;
