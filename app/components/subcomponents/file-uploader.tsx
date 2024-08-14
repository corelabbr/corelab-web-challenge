import React, { useState } from "react";
import { uploadFile } from "@/app/api/note/upload-file";
import { useNotes } from "@/app/context/notes-context";
import { updateNote } from "@/app/api/note/update-note";
import { useSession } from "@/app/context/session-id-context";

export function FileUploader({ noteId }: { noteId: string }) {
  const { notes, setNotes } = useNotes();
  const { userId } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
    await uploadAndAttachFile(uploadedFile);
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
    if (uploadedFile) {
      await uploadAndAttachFile(uploadedFile);
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  async function uploadAndAttachFile(file: File) {
    try {
      setUploadStatus("Uploading...");

      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await uploadFile(formData);
      await updateNote({
        id: noteId,
        file: uploadResponse.filename,
        user_id: userId || "",
      }).then(() => {
        const updatedNote = notes.find((note) => note.id === notes[0].id);
        if (updatedNote) {
          updatedNote.file = uploadResponse.filename;
          setNotes([...notes]);
        }
      });
      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
      setUploadStatus("Upload failed.");
    }
  }

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className=" h-48">
      <p className="text-sm text-gray-500">
        Clique ou arraste o arquivo para esta área para fazer upload
      </p>
      <input type="file" className="hidden" onChange={handleFileChange} />
      {file && (
        <p className="text-sm text-green-500 mt-2">Arquivo: {file.name}</p>
      )}
      {uploadStatus && (
        <p className="text-sm text-blue-500 mt-2">{uploadStatus}</p>
      )}
    </div>
  );
}
