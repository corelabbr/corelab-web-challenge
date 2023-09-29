import { styled } from "styled-components";

export const Container = styled.div`
    margin-top: 50px;
    max-width: 1400px;
    margin: auto;
    height: 100%;

    @media (max-width: 576px) {
        max-width: 100px;
    }
`

export const TitleOtherAndFavorite = styled.div`
    margin-top: 100px;
    margin-left: 40px;
    padding: 5px;
    color: #333333;
`

export const ContentNotes = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    max-width: 1400px;
    padding: 50px;
    gap: 30px;
    height: 100%;

    @media (max-width: 576px) {
        max-width: 10px;
    }
`
