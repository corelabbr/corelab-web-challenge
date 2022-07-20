import { useVehicles } from "../../providers/VehiclesProvider";
import { SearchButton, Card, SearchInput, FilterIcon, Header } from "../../components";

import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { VehiclesPageContainer, SearchContainer, CardsContainer } from "./styles";

const VehiclesPage = () => {
	const navigate = useNavigate();
	const {
		search,
		vehicles,
		favoriteVehicles,
		isFilterActive,
		handleSearch,
		handleDeleteVehicle,
		handleToggleFavorite,
		handleResetSearchAndFilter,
	} = useVehicles();

	const displayFavoritesSection = favoriteVehicles.length > 0;

	const displayAnnouncementTitle =
		favoriteVehicles.length > 0 && vehicles.length > favoriteVehicles.length;

	async function handleOnChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
		event.preventDefault();

		handleSearch(event.target.value);
	}

	return (
		<VehiclesPageContainer>
			<Header
				onClick={handleResetSearchAndFilter}
				displayButton={!!search || isFilterActive}
			/>

			<SearchContainer>
				<SearchInput placeholder="Buscar" value={search} onChange={handleOnChange} />
				<FilterIcon onClick={() => navigate("/filter-options")} />
			</SearchContainer>

			<SearchButton onClick={() => navigate("/create")}>ADICIONAR</SearchButton>

			{displayFavoritesSection && (
				<CardsContainer>
					<h2>Meus favoritos</h2>

					{vehicles
						.filter((vehicle) => vehicle.isFavorite)
						.map((vehicle) => (
							<Card
								key={vehicle.id}
								vehicle={vehicle}
								onClickEdit={() => navigate(`/update/${vehicle.id}`)}
								onClickDelete={() => handleDeleteVehicle(vehicle.id)}
								onClickFavorite={() => handleToggleFavorite(vehicle.id)}
							/>
						))}
				</CardsContainer>
			)}

			<CardsContainer>
				{displayAnnouncementTitle && <h2>Anúncios</h2>}

				{vehicles
					.filter((vehicle) => !vehicle.isFavorite)
					.map((vehicle) => (
						<Card
							key={vehicle.id}
							vehicle={vehicle}
							onClickEdit={() => navigate(`/update/${vehicle.id}`)}
							onClickDelete={() => handleDeleteVehicle(vehicle.id)}
							onClickFavorite={() => handleToggleFavorite(vehicle.id)}
						/>
					))}
			</CardsContainer>
		</VehiclesPageContainer>
	);
};

export default VehiclesPage;
