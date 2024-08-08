import useFlashMessage from "./useFlashMessage";
import coreNotesApi from "../utils/coreNotesApi";

interface Note {
  title: string;
  favorite: boolean;
  color?: string,
  content: string;
}

interface EditNote {
  _id: object,
  title: string;
  oldTitle: string;
  favorite: boolean;
  oldFavorite: boolean;
  content: string;
  oldContent: string;
}

interface EditColor {
  _id: object,
  color: string
}

interface DeleteNote {
  _id: object
}

export default function useNote() {
  const { setFlashMessage } = useFlashMessage();

  async function getData() {
    const response = await coreNotesApi.get("/");
    return response.data;
  }

  async function getDataSearch(search: string) {
    const encodedSearch = encodeURIComponent(search);

    const response = await coreNotesApi.get(`/search`, {
      params: {
        search: encodedSearch
      }
    });
    return response.data;
  }

  async function newNote(note: Note) {
    let msgText = "";
    let type = "";
    try {
      const data = await coreNotesApi
        .post("/", note)
        .then((response) => {
          return response.data;
        });

      msgText = data.message;
      type = data.type;
    } catch (error: any) {
      msgText = error.response.data.message;
      type = error.response.data.type;
    }

    setFlashMessage(msgText, type);
  }

  async function editNote(note: EditNote) {
    let msgText = "";
    let type = "";
    try {
      const data = await coreNotesApi
        .patch("/", note)
        .then((response) => {
          return response.data;
        });

      msgText = data.message;
      type = data.type;
    } catch (error: any) {
      msgText = error.response.data.message;
      type = error.response.data.type;
    }

    setFlashMessage(msgText, type);
  }

  async function editColor(note: EditColor) {
    let msgText = "";
    let type = "";
    try {
      const data = await coreNotesApi
        .patch("/color", note)
        .then((response) => {
          return response.data;
        });

      msgText = data.message;
      type = data.type;
    } catch (error: any) {
      msgText = error.response.data.message;
      type = error.response.data.type;
    }

    setFlashMessage(msgText, type);
  }

  async function deleteNote(note: DeleteNote) {
    let msgText = "";
    let type = "";
    try {
      const data = await coreNotesApi
        .delete(`/${note}`)
        .then((response) => {
          return response.data;
        });

      msgText = data.message;
      type = data.type;
    } catch (error: any) {
      msgText = error.response.data.message;
      type = error.response.data.type;
    }

    setFlashMessage(msgText, type);
  }

  return {
    getData,
    newNote,
    editNote,
    editColor,
    deleteNote,
    getDataSearch
  };
}
