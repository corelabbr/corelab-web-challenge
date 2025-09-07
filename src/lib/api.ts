// Define a URL base da API
const API = "http://localhost:3333";

// Função que cria o endpoint completo concatenando a URL base com o caminho fornecido
const endpoint = (path: string): string => API + path;

// Função genérica para fazer requisições GET
// Recebe um caminho e retorna o JSON da resposta
const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};

// Função genérica para requisições que não sejam GET (POST, PUT, PATCH, DELETE)
// path: caminho da requisição
// method: método HTTP
// body: opcional, dados a serem enviados no corpo da requisição
const request = async (path: string, method: string, body?: any) => {
  const res = await fetch(endpoint(path), {
    method, // tipo de requisição (GET, POST, etc.)
    headers: { "Content-Type": "application/json" }, // indica que o corpo é JSON
    body: body ? JSON.stringify(body) : undefined, // converte os dados em JSON se existir
  });

  // Se a resposta não for OK, lança um erro
  if (!res.ok) throw new Error(`Failed ${method} request`);

  // Retorna a resposta em JSON
  return res.json();
};

// Função para buscar todos os todos marcados como favoritos
export const getTodosFavorited = async () => {
  return get("/todos?favorited=true"); // chama a função get com o filtro
};

// Função para buscar todos os todos que NÃO são favoritos
export const getTodosNoFavorited = async () => {
  return get("/todos?favorited=false"); // chama a função get com filtro oposto
};

// Função para alternar (toggle) o estado de favorito de um todo específico
export const toggleFavoritedTodos = async (id: number) => {
  return request(`/todos/${id}/favorite`, "PATCH"); // usa PATCH para alterar parcialmente
};

// Função para atualizar um todo com novos dados
export const updateTodos = async (id: number, data: any) => {
  return request(`/todos/${id}`, "PUT", data); // usa PUT para substituir os dados
};

// Função para criar um novo todo
export const createTodos = async (data: any) => {
  return request(`/todos`, "POST", data); // POST para criar recurso
};

// Função para deletar um todo pelo ID
export const deleteTodos = async (id: number) => {
  return request(`/todos/${id}`, "DELETE"); // DELETE para remover recurso
};
