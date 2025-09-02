import api, { IAPIError } from '../../api';

export interface IHealthCheckResponse {
  message: string;
  status: string;
  timestamp: string;
}

const healthCheck = async (): Promise<IHealthCheckResponse | IAPIError> => {
  const response = await api.get(`/app/healthcheck`).catch((err) => {
    return err.response;
  });

  return response.data;
};

export default healthCheck;
