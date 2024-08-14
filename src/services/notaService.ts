
// pego as notas pela api
export const getNotas = async () => {
    try {
        const response = await fetch('/api/notas');

        if (!response.ok) {
            throw new Error(`Erro ao buscar notas: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar notas:', error);
        throw error;
    }
};

export const createNota = async (titulo: string, conteudo: string, cor_id:number, favorito: boolean) => {
    const response = await fetch('/api/notas', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({titulo, conteudo, cor_id, favorito})
    });

    if(!response.ok){
        throw new Error('Erro ao criar nota');
    }
    return await response.json();
};

export const updateNota = async (nota:any) => {
    const response = await fetch(`/api/notas/${nota.id}`, {
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(nota)
    });

    if(!response.ok){
        throw new Error('Erro ao atulizar nota');
    }
    return await response.json();
};

export const deleteNote = async (id:number) => {
    const response = await fetch(`/api/notas/${id}`, { 
        method: 'DELETE',
    });
    if(!response.ok){
        throw new Error('Erro ao deletar nota');
    }
    return await response.json();
}

// pego as cores pela api
export const getCores = async () => {
    const response = await fetch('/api/cores');
    if(!response.ok){
        throw new Error('Erro ao buscar notas');
    }
    return await response.json();
};