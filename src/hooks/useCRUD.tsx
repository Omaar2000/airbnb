import { useState } from "react";
import axios, { AxiosResponse } from "axios";

// Define types for the data and error
interface Error {
  message: string;
}

// Define the hook return type
interface UseCrudResult {
  data: any;
  loading: boolean;
  error: Error | null;
  get: (url: string) => Promise<void>;
  post: (url: string, body: object | FormData) => Promise<void>;
  postMultipart: (url: string, body: object | FormData) => Promise<void>;
  // put: (url: string, body: object | FormData) => Promise<void>;
  deleteItem: (url: string) => Promise<void>;
}

const useCrud = (): UseCrudResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const handleRequest = async (
    request: () => Promise<AxiosResponse<any>>
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await request();
      setData(response.data);
      console.log(response.data);
      setError(null); // Clear previous errors
    } catch (err: any) {
      setError({
        message: err.response?.data?.message || err.message || "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const get = async (url: string): Promise<void> => {
    await handleRequest(() => axios.get(url));
  };

  const post = async (url: string, body: object | FormData): Promise<void> => {
    await handleRequest(() => axios.post(url, body));
  };
  const postMultipart = async (
    url: string,
    body: object | FormData
  ): Promise<void> => {
    await handleRequest(() =>
      axios.post(url, body, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  };

  // const put = async (url: string, body: object | FormData): Promise<void> => {
  //   const isMultipart = body instanceof FormData;
  //   await handleRequest(() =>
  //     axios.put(url, body, {
  //       headers: isMultipart ? { "Content-Type": "multipart/form-data" } : {},
  //     })
  //   );
  // };

  const deleteItem = async (url: string): Promise<void> => {
    await handleRequest(() => axios.delete(url));
  };

  return {
    data,
    loading,
    error,
    get,
    post,
    postMultipart,
    // put,
    deleteItem,
  };
};

export default useCrud;
