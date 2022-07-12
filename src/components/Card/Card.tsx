import { Pencil, Heart, X} from 'phosphor-react';
import { useState } from 'react';
import styles from './Card.module.scss';

import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    id: Number;
    name: String;
    description: String;
    color: String;
    year: String;
    plate: String;
    price: String;
    isFavorite: Boolean;
}

export function Card({ id, name, description, color, year, price, isFavorite }: CardProps) {
    const navigate = useNavigate();
    const [isCardFavorite, setIsCardFavorite] = useState(false);

    function handleFavorite() {
        setIsCardFavorite(!isCardFavorite);

        if(isCardFavorite) {
            isFavorite = false;
        } else {
            isFavorite = true;
        }
    }

    async function handleDelete(id: Number) {
        try {
            await api.delete(`/vehicle/${id}`);
            alert('Veículo deletado com sucesso!')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.card}>
            <header className={styles.card__header}>
                <button>
                    <Pencil 
                        size={32}
                        onClick={() => navigate(`/update/${id}`)}
                    />
                </button>
                <button>
                    <X 
                        size={32}
                        onClick={() => {
                            handleDelete(id);
                            window.location.reload();
                            alert('Veículo deletado com sucesso!')
                        }}
                    />
                </button>
                <button
                    onClick={handleFavorite}
                >
                    {isCardFavorite ? <Heart size={36} weight="fill" /> : <Heart size={32} />}
                </button>
            </header>
            <div className={styles.card__content}>
                <h2>{name}</h2>
                <p>Preço: {price.toString()}</p>
                <p>Descrição: {description}</p>
                <p>Ano: {year.toString()}</p>
                <p>Cor: {color}</p>
            </div>
        </div>
    )
}
