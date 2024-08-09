import Image from 'next/image'

type FavoriteToggleProps = {
  isFavorite: boolean
  setIsFavorite: (isFavorite: boolean) => void
}

export const FavoriteToggleIcon = ({
  isFavorite,
  setIsFavorite,
}: FavoriteToggleProps) => {
  return (
    <button tabIndex={-1} type="button" onClick={() => setIsFavorite(!isFavorite)}
      className='flex-shrink-0'
    >
      {isFavorite ? (
        <Image
          alt="favorite icon"
          src="/star-fill.svg"
          height={20}
          width={20}
          className="bg-transparent"
        />
      ) : (
        <Image alt="favorite icon" src="/star.svg" height={20} width={20} />
      )}
    </button>
  )
}
