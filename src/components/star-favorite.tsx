import { Star } from "lucide-react";

export function StarFavorite({ onClick, favoriteState }: { onClick: (newState: boolean) => void; favoriteState: boolean }) {
  // const [isFavorite, setIsFavorite] = useState(favoriteState);
  

  function handleClick() {
    // const newState = !isFavorite;
    const newState = !favoriteState;
    // setIsFavorite(newState);
    onClick(newState);
  }

  return (
    <div>
      {/* {isFavorite ? "Ok" : "wolo"} */}
      <Star size={20} className={`${favoriteState && "fill-yellow-200"} cursor-pointer`} onClick={handleClick} />
    </div>
  );
}
