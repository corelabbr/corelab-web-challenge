import { MdDownload } from 'react-icons/md'

type DownloadButtonProps = {
  url: string
}
export const DownloadButton = ({ url }: DownloadButtonProps) => {
  const handleDownload = async () => {
    const response = await fetch(url)
    const blob = await response.blob()
    const urlDownload = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = urlDownload
    a.download = url.split('/').pop() || 'file'
    a.click()

    URL.revokeObjectURL(urlDownload)
  }

  return (
    <button onClick={handleDownload}
      className="p-1 rounded-md bg-neutral-800/20 hover:bg-neutral-800/30"
    >
      <MdDownload />
    </button>
  )
}
