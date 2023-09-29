import { useState } from "react";
import { favorite } from "../../services/NoteService";
import { Icon, IconStar } from "./styles";

interface FavoriteNoteProps {
    data: { _id: string, isFavorite: boolean };
}

const FavoriteNote: React.FC<FavoriteNoteProps> = ({data}) => {
    const [favoriteColor, setFavoriteColor] = useState<string>('orange');

    const handleFavorite = () => {
        if(favoriteColor === 'orange') {
            favorite(data._id, false)
            setFavoriteColor('');
        } else if(favoriteColor === '') {
            favorite(data._id, true)
            setFavoriteColor('orange');
        }
    }

    return (
        <Icon onClick={handleFavorite}>
            <IconStar color={data.isFavorite ? favoriteColor : ''} />
        </Icon>
    )
}

export default FavoriteNote;
