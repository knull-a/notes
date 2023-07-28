import axios from "axios";
export async function useFetch<T>(name: string) {
  const { data } = await axios.get<T>(`http://localhost:3001/api/v1/${name}`);
  return data;
}

export async function usePageableFetch<T>(name: string, pageParam = 1) {
  const { data } = await axios.get<any>(`http://localhost:3001/api/v1/${name}?page=${pageParam}`)
  return data.data
}
