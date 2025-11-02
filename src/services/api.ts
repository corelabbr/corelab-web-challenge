const API = "http://localhost:3333";

const endpoint = (path: string): string => API + path;

// Função para verificar se a resposta é válida
const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro na requisição");
  }
  return response.json();
};

export const get = async (path: string): Promise<any> => {
  try {
    const response = await fetch(endpoint(path));
    return await checkResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao buscar dados: ${error.message}`);
    } else {
      throw new Error(`Erro ao buscar dados: Erro desconhecido`);
    }
  }
};

export const post = async (path: string, data: any): Promise<any> => {
  try {
    const response = await fetch(endpoint(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await checkResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao enviar dados: ${error.message}`);
    } else {
      throw new Error(`Erro ao enviar dados: Erro desconhecido`);
    }
  }
};

export const put = async (path: string, data: any): Promise<any> => {
  try {
    const response = await fetch(endpoint(path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await checkResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao atualizar dados: ${error.message}`);
    } else {
      throw new Error(`Erro ao atualizar dados: Erro desconhecido`);
    }
  }
};

export const del = async (path: string): Promise<any> => {
  try {
    const response = await fetch(endpoint(path), {
      method: "DELETE",
    });
    return await checkResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao deletar dados: ${error.message}`);
    } else {
      throw new Error(`Erro ao deletar dados: Erro desconhecido`);
    }
  }
};
