import { useNavigate } from "react-router-dom";
import { FilterOptionsForm, Header } from "../../components";
import { GenericPageContainer } from "../styles";

export function FilterOptions() {
	const navigate = useNavigate();

	return (
		<GenericPageContainer>
			<Header onClick={() => navigate("/")} />

			<FilterOptionsForm />
		</GenericPageContainer>
	);
}
