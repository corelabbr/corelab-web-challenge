import api, { IAPIError } from '../../api';

export interface IBrowseNotesResponse {
  id_note: string;
  note_title: string;
  note_text: string;
  note_color: 'red' | 'yellow' | 'blue' | 'green';
  starred: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const browseNotes = async (
  token: string,
): Promise<IBrowseNotesResponse[] | IAPIError> => {
  const response = await api
    .get(`/notes/browse`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response.data;
};

export default browseNotes;
