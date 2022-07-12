import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import styles from "../../styles/Card.module.scss";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IVehicle } from "../../types/Vehicle";
import { deleteVehicle, favoriteOrUnfavoriteVehicle } from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import VehicleModal from "../VehicleModal";
import { closeAddModal, openEditModal } from "../../redux/modalSlice";
import { selectModal } from "../../redux/store";
import { deleteVehicleById } from "../../redux/vehiclesSlice";

interface ICard {
  id: number;
  type: string;
  title: string;
  color: string;
  is_favorite: boolean;
  children: ReactNode;
  favoritesVehicles: IVehicle[];
  setFavoritesVehicles: Dispatch<SetStateAction<IVehicle[] | any>>;
}

const Card = ({
  title,
  type,
  children,
  id,
  color,
  favoritesVehicles,
  is_favorite,
  setFavoritesVehicles,
}: ICard) => {
  const { editModalOpen } = useSelector(selectModal);
  const [edit, setEdit] = useState<boolean>(editModalOpen);
  const dispatch = useDispatch();
  const [favoriteIcon, setFavoriteIcon] = useState<boolean>(is_favorite);
  localStorage.setItem("favorites", JSON.stringify([...favoritesVehicles]));

  const deleteVehicleHandler = async () => {
    try {
      await deleteVehicle(id);
      dispatch(deleteVehicleById(id));
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = () => {
    dispatch(openEditModal());
    dispatch(closeAddModal());
    setEdit(true);
  };

  const favoriteHandler = async () => {
    setFavoriteIcon(!favoriteIcon);

    const data = await favoriteOrUnfavoriteVehicle(id, {
      is_favorite: !favoriteIcon,
    });

    if (data.is_favorite) {
      /* set favorite vehicle */
      setFavoritesVehicles([...favoritesVehicles, data]);
    } else {
      /* set unfavorite vehicle */
      setFavoritesVehicles((prev: any) =>
        prev.filter((item: any) => item.id !== data.id)
      );
    }
  };

  return (
    <>
      <div className={styles.Card}>
        <div className={styles.container} style={{ backgroundColor: color }}>
          <div className={styles.icons} style={{ color: "white" }}>
            {type !== "favorites" && <FiEdit onClick={clickHandler} />}
            {type !== "favorites" && (
              <AiOutlineDelete onClick={() => deleteVehicleHandler()} />
            )}
            {favoriteIcon ? (
              <MdFavorite onClick={favoriteHandler} />
            ) : (
              <MdOutlineFavoriteBorder onClick={favoriteHandler} />
            )}
          </div>
          <div className={styles.content} style={{ color: "white" }}>
            <h2>{title}</h2>
            {children}
          </div>
        </div>
      </div>
      {editModalOpen && edit && (
        <VehicleModal text={`Editar Veículo ${title}`} type={"edit"} id={id} />
      )}
    </>
  );
};

export default Card;
