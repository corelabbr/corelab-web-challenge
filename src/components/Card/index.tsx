import { FavoriteIcon, DeleteIcon, EditIcon } from "..";
import { IVehicle } from "../../shared/types";
import { CardContainer, IconsContainer } from "./styles";
import { colors } from "../../shared/constants";

interface CardProps {
	onClickEdit: () => void;
	onClickDelete: () => void;
	onClickFavorite: () => void;
	vehicle: IVehicle;
}

export default function Card({
	onClickDelete,
	onClickFavorite,
	onClickEdit,
	vehicle,
}: CardProps) {
	return (
		<CardContainer
			darkFontColor={vehicle.color === "BRANCO" ? true : false}
			backgroundColor={vehicle.color ? colors[vehicle.color] : "red"}
		>
			<IconsContainer>
				<EditIcon onClick={onClickEdit} />
				<DeleteIcon onClick={onClickDelete} />
				<FavoriteIcon isFavorite={vehicle.isFavorite} onClick={onClickFavorite} />
			</IconsContainer>
			<h3>{vehicle.name}</h3>
			<p>Price: {vehicle.price}</p>
			<p>Brand: {vehicle.brand}</p>
			<p>Description: {vehicle.description}</p>
			<p>Year: {vehicle.year} </p>
		</CardContainer>
	);
}
