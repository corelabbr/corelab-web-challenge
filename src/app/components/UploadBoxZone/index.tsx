import { cn } from '@/lib/utils'
import Dropzone from 'react-dropzone'

type UploadBoxZoneProps = {
  className?: string
  handleOnUploadFile: (file: File) => void
}
export const UploadBoxZone = ({
  className,
  handleOnUploadFile,
}: UploadBoxZoneProps) => {
  return (
    <Dropzone multiple={false} onDrop={(files) => handleOnUploadFile(files[0])}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <section>
          <div
            {...getRootProps()}
            className={cn(
              'flex items-center justify-center border-2 border-neutral-800/20 border-dashed rounded-md p-4 cursor-pointer',
              isDragActive && 'border-neutral-800/50',
              isDragReject && 'border-red-600',
              className
            )}
          >
            <input {...getInputProps()} />
            <p>Clique ou arraste um arquivo aqui!</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
}
