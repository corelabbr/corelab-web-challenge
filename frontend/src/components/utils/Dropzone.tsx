import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUploadWithPreview } from 'file-upload-with-preview';

interface IDropzoneProps {
  changeUploadedImage: (image: File) => void;
}

export const MyDropzone = ({ changeUploadedImage }: IDropzoneProps) => {
  const [image, setImage] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const upload = new FileUploadWithPreview('test');
    upload.addFileToPreviewPanel(acceptedFiles[0]);
    setImage(upload.cachedFileArray[0]);
    changeUploadedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        style={{
          border: '1px solid black',
          padding: '1rem',
        }}
      >
        <input {...getInputProps()} onClick={(e) => e.preventDefault()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div
        className="custom-file-container image-preview-container"
        data-upload-id="test"
      />
    </>
  );
};
