import useSWR from 'swr';
import { Session } from 'next-auth';

export function useFetch<Data = any>(url: string, session: Session) {
  const authToken = session?.user.accessToken;

  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  const { data, error, isLoading, mutate } = useSWR<Data>(
    url,
    async (url: string) => {
      const response = await fetch(url, config);

      const data = await response.json();
      return data;
    }
  );

  return { data, error, isLoading, mutate };
}
