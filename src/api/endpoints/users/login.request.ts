import api, { IAPIError } from '../../api';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
  };
}

const login = async (
  data: ILoginRequest,
): Promise<ILoginResponse | IAPIError> => {
  const response = await api.post(`/user/login`, data).catch((err) => {
    return err.response;
  });

  return response.data;
};

export default login;
