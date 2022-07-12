import axios from "axios";
import styled from "styled-components";
import { API } from "../../API";
import { useIsLoadingContext } from "../../contexts/IsLoadingContext";
import { useUserContext } from "../../contexts/UserContext";

export default function Form({ children, body, validate, endpoint }) {
    const { user } = useUserContext();
    const { setIsLoading } = useIsLoadingContext();

    async function sendForm(e) {
        e.preventDefault();
        setIsLoading(true);


        const promise = axios.post(API + endpoint, body);
        promise.then(res => {
            validate(res);
            console.log(res);
            setIsLoading(false);
        }).catch(err => {
            const { response } = err;
            setIsLoading(false);
            validate(response);
        });

    }
    return (
        <ContainerForm>
            <StyledForm onSubmit={(e) => sendForm(e)}>
                {children}
            </StyledForm>
        </ContainerForm>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const ContainerForm = styled.div`
    width: 326px;
    background-color: white;
    border-radius: 10px;
    padding: 15px;

`;