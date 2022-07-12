import { useState, useEffect } from "react";
import styled from "styled-components";
import { IonIcon } from "@ionic/react";
import { optionsOutline } from "ionicons/icons";

import SearchBar from "../components/SearchBar";
import { FlexContainer } from "../components/style/FlexContainer";
import AddButton from "../components/AddButton";
import AdForm from "./AdForm";
import { useIsLoadingContext } from "../contexts/IsLoadingContext";
import axios from "axios";
import { API } from "../API";
import AdCard from "../components/AdCard";


export default function Home() {
  const [isHidden, setIsHidden] = useState(true);
  const [ads, setAds] = useState(null);
  const { isLoading } = useIsLoadingContext();

  useEffect(() => {
    const promise = axios.get(API + "/vehicule/ad");
    promise.then(({ data }) => {
      setAds(data);
    }).catch(err => {
      console.log(err);
    });
  }, [isLoading])
  return (
    <FlexContainer direction={"column"}>
      <SearchContainer justify={"space-between"}>
        <SearchBar />
        <StyledIcon size={"large"} icon={optionsOutline} />
      </SearchContainer>
      <AddButton setIsHidden={setIsHidden} />
      {!isHidden && <AdForm setIsHidden={setIsHidden} />}
      <AdsContainer>
        {ads && ads.map((ad, index) => <AdCard key={index} ad={ad} />)}
      </AdsContainer>
    </FlexContainer>
  );
}

const AdsContainer = styled.div`
  overflow: scroll;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIcon = styled(IonIcon)`
  cursor: pointer;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

