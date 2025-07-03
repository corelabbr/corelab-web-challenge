import styled from "styled-components";

export const FavotireNoteSection = styled.section`
  align-self: flex-start;
  padding-top: 1rem;
  padding-left: 6.625rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 579px) {
    padding-left: 0;
    align-self: center;
  }
`

export const FavoriteTitle = styled.h3`
  font-size: 0.75rem;
  padding-left: 1.5rem;
  color: #464646;
  font-weight: 400;
`

export const FavoriteContent = styled.div`
  display: flex;
  gap: 2.25rem;
  overflow-x: auto;
  padding-bottom: 1rem;

  @media (max-width: 579px) {
    flex-direction: column;
  }
`