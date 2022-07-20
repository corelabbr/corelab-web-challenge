import { useNavigate } from "react-router-dom";

import { Header, VehicleForm } from "../../components";
import { useVehicles } from "../../providers/VehiclesProvider";
import { GenericPageContainer } from "../styles";

function CreateVehicle() {
	const { handleCreateVehicle } = useVehicles();
	const navigate = useNavigate();

	return (
		<GenericPageContainer>
			<Header onClick={() => navigate("/")} />
			<VehicleForm onSubmit={handleCreateVehicle} />
		</GenericPageContainer>
	);
}

export default CreateVehicle;
