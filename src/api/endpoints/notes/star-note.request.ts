import api, { IAPIError } from '../../api';
import { IHealthCheckResponse } from '../application/healthcheck.request';

export interface IStarNoteRequest {
  note_id: string;
}

const starNote = async (
  data: IStarNoteRequest,
  token: string,
): Promise<IHealthCheckResponse | IAPIError> => {
  const response = await api
    .post(`/notes/star`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export default starNote;
