import api, { IAPIError } from '../../api';

export interface IHomeDataResponse {
  user: {
    id: string;
    name: string;
  };
}

const getHomeData = async (
  token: string,
): Promise<IHomeDataResponse | IAPIError> => {
  const response = await api
    .get(`/user/home-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response.data;
};

export default getHomeData;
