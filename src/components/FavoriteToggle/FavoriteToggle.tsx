import { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useToggleFavorite } from '../../hooks';

interface FavoriteToggleProps {
  taskId: number;
  isFavorite: boolean;
}

const FavoriteToggle = ({ taskId, isFavorite }: FavoriteToggleProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const mutation = useToggleFavorite();

  const handleToggle = () => {

    mutation.mutate({ id: taskId, favorite: !favorite },
      {
        onSuccess: () => setFavorite(!favorite)
      }
    );
  };
  return (
    <IconButton onClick={handleToggle} aria-label="toggle favorite">
      <FavoriteIcon sx={{ color: favorite ? 'gold' : 'grey' }} />
    </IconButton>
  );
}

export default FavoriteToggle;