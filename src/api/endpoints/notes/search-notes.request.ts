import api, { IAPIError } from '../../api';

export interface ISearchNotesResponse {
  id_note: string;
  note_title: string;
  note_text: string;
  note_color: 'red' | 'yellow' | 'blue' | 'green';
  starred: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const searchNotes = async (
  content: string,
  token: string,
): Promise<ISearchNotesResponse[] | IAPIError> => {
  const response = await api
    .get(`/notes/search?content=${content}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response.data;
};

export default searchNotes;
