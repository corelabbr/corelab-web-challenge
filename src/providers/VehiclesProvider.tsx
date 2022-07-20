import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	createVehicle,
	deleteVehicle,
	getVehicles,
	toggleVehicleFavorite,
	updateVehicle,
} from "../services/api";
import { IFilterOptions, IVehicleFormData, IVehicle } from "../shared/types";

const initialFilterOptions: IFilterOptions = {
	brand: "",
	color: "",
	year: "",
	minPrice: "",
	maxPrice: "",
};

interface VehiclesContextData {
	filterOptions: IFilterOptions;
	search: string;
	vehicles: IVehicle[];
	favoriteVehicles: IVehicle[];
	isFilterActive: boolean;
	handleSearch: (search: string) => void;
	handleUpdateFilterOptions: (filterOptions: IFilterOptions) => void;
	handleCreateVehicle: (CreateVehicleData: IVehicleFormData) => Promise<void>;
	handleUpdateVehicle: (UpdateVehicleData: IVehicleFormData) => Promise<void>;
	handleDeleteVehicle: (id: string) => Promise<void>;
	handleToggleFavorite: (id: string) => Promise<void>;
	handleResetSearchAndFilter: () => Promise<void>;
}

interface VehiclesProviderProps {
	children: ReactNode;
}

const VehiclesContext = createContext<VehiclesContextData>({} as VehiclesContextData);

export function VehiclesProvider({ children }: VehiclesProviderProps) {
	const navigate = useNavigate();

	const [search, setSearch] = useState<string>("");
	const [vehicles, setVehicles] = useState<IVehicle[]>([]);
	const [favoriteVehicles, setFavoriteVehicles] = useState<IVehicle[]>([]);
	const [filterOptions, setFilterOptions] =
		useState<IFilterOptions>(initialFilterOptions);
	const [isFilterActive, setFilterActive] = useState(false);

	useEffect(() => {
		const fetchVehicles = async () => {
			const { data } = await getVehicles();

			setVehicles(data);
		};

		fetchVehicles();
	}, []);

	useEffect(() => {
		const favoriteVehicles = vehicles.filter((vehicle) => vehicle.isFavorite);

		setFavoriteVehicles(favoriteVehicles);
	}, [vehicles]);

	useEffect(() => {
		let isFilterActive = false;

		for (let option in filterOptions) {
			if (filterOptions[option]) {
				isFilterActive = true;
				break;
			}
		}

		setFilterActive(isFilterActive);
	}, [filterOptions]);

	async function handleUpdateFilterOptions(filterOptions: IFilterOptions): Promise<void> {
		try {
			setFilterOptions(filterOptions);

			const { data } = await getVehicles(search, filterOptions);

			setVehicles(data);

			navigate("/");
		} catch {
			console.log("Could not update filter options");
		}
	}

	async function handleSearch(search: string): Promise<void> {
		try {
			setSearch(search);

			const { data } = await getVehicles(search, filterOptions);

			setVehicles(data);
		} catch {
			console.log("Could not update search");
		}
	}

	async function handleCreateVehicle(CreateVehicleData: IVehicleFormData): Promise<void> {
		try {
			await createVehicle(CreateVehicleData);

			const { data } = await getVehicles(search, filterOptions);

			setVehicles(data);

			navigate("/");
		} catch (error) {
			console.log("Could not create vehicle");
		}
	}

	async function handleUpdateVehicle(CreateVehicleData: IVehicleFormData): Promise<void> {
		try {
			await updateVehicle(CreateVehicleData, CreateVehicleData.id);

			const { data } = await getVehicles(search, filterOptions);

			setVehicles(data);

			navigate("/");
		} catch {
			console.log("Could not update vehicle");
		}
	}

	async function handleDeleteVehicle(id: string): Promise<void> {
		try {
			await deleteVehicle(id);

			const { data } = await getVehicles(search, filterOptions);

			setVehicles(data);
		} catch {
			console.log("Could not delete vehicle");
		}
	}

	async function handleToggleFavorite(id: string): Promise<void> {
		try {
			await toggleVehicleFavorite(id);

			const { data } = await getVehicles(search, filterOptions);

			setVehicles(data);
		} catch {
			console.log("Could not update favorite status");
		}
	}

	async function handleResetSearchAndFilter(): Promise<void> {
		setSearch("");

		setFilterOptions(initialFilterOptions);

		const { data } = await getVehicles();

		setVehicles(data);
	}

	return (
		<VehiclesContext.Provider
			value={{
				filterOptions,
				search,
				vehicles,
				favoriteVehicles,
				isFilterActive,
				handleUpdateFilterOptions,
				handleSearch,
				handleCreateVehicle,
				handleDeleteVehicle,
				handleUpdateVehicle,
				handleToggleFavorite,
				handleResetSearchAndFilter,
			}}
		>
			{children}
		</VehiclesContext.Provider>
	);
}

export function useVehicles() {
	const context = useContext(VehiclesContext);

	return context;
}
