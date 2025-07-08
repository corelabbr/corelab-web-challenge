const apiUrl: string = import.meta.env.VITE_BACKEND_URL;

export const fetchApi = async (endpoint: string, params: any): Promise<any> => {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.favorite !== undefined) query.append('favorite', String(params.favorite));
  if (params.color !== undefined) query.append('color', String(params.color));

  const response = await fetch(`${apiUrl}/${endpoint}?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch from API');
  }

  return response.json();
};

export const postApi = async (endpoint: string, payload: any): Promise<void> => {
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create item');
  }

  return response.json();
};

export const patchApi = async (endpoint: string, id: number, update: any): Promise<any> => {
  const response = await fetch(`${apiUrl}/${endpoint}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return response.json();
};

export const deleteItemApi = async (endpoint: string, id: number): Promise<void> => {
  const response = await fetch(`${apiUrl}/${endpoint}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete item');
  }

  return response.json();
};