import React, { ReactNode } from "react";
import styles from "./Card.module.scss";
import { DataContext } from "@/context";
import { IVehicle } from "@/types/Vehicle";
import { useAxios } from "@/hooks";

interface ICard {
  title: string;
  children: ReactNode;
  faved: boolean;
  itemid: number;
}

const EditButton = ({ faved, itemid }: { faved: boolean; itemid: number }) => {
  const { axiosRequest } = useAxios();
  const { fetchData, dataResponse, loading, erro } = axiosRequest;
  const { dataContext } = DataContext();
  const { vehicleList, favedList, populatedLists } = dataContext;
  return (
    <img
      src='./assets/editItem.svg'
      alt='Editar'
      onClick={() => {
        console.log(itemid);
      }}
    />
  );
};

const RemoveButton = ({ faved, itemid }: { faved: boolean; itemid: number }) => {
  const { dataContext } = DataContext();

  const { axiosRequest } = useAxios();
  const { fetchData, dataResponse, loading, erro } = axiosRequest;

  let newVehicleList: IVehicle[];
  let newFavedList: IVehicle[];

  const deleteEntry = {
    url: "/delete",
    method: "post",
    data: {
      id: itemid,
    },
  };

  const { vehicleList, favedList, setFavedList, setVehicleList, populatedLists } = dataContext;
  return (
    <img
      src='./assets/removeItem.svg'
      alt='Remover'
      onClick={() => {
        populatedLists && fetchData(deleteEntry);
        if (faved) {
          newFavedList = favedList.filter((item) => item.id !== itemid);
          setFavedList(newFavedList);
        } else {
          newVehicleList = vehicleList.filter((item) => item.id !== itemid);
          setVehicleList(newVehicleList);
        }
      }}
    />
  );
};

const FavButton = ({ faved, itemid }: { faved: boolean; itemid: number }) => {
  const { dataContext } = DataContext();
  const { vehicleList, setVehicleList, favedList, setFavedList, populatedLists } = dataContext;

  const { axiosRequest } = useAxios();
  const { fetchData, dataResponse, loading, erro } = axiosRequest;

  let newVehicleList: IVehicle[];
  let newFavedList: IVehicle[];

  const favEntry = {
    url: "/update",
    method: "post",
    data: {
      id: itemid,
      isFavorite: !faved,
    },
  };

  const updateNormalList = (item: any) => {
    if (vehicleList !== undefined) {
      setVehicleList((prev: any) => [...prev, item]);
    } else {
      setVehicleList(item);
    }
  };
  const updateFavedList = (item: any) => {
    if (favedList !== undefined) {
      setFavedList((prev: any) => [...prev, item]);
    } else {
      setFavedList(item);
    }
  };

  return (
    <>
      {faved === true ? (
        <img
          src='./assets/favedItem.svg'
          alt='Desfavoritar'
          onClick={() => {
            newFavedList = [];
            favedList.filter((item) => (item.id === itemid ? updateNormalList(item) : newFavedList.push(item)));
            setFavedList(newFavedList);
            fetchData(favEntry);
          }}
        />
      ) : (
        <img
          src='./assets/favItem.svg'
          alt='Favoritar'
          onClick={() => {
            newVehicleList = [];
            vehicleList.filter((item: any) => (item.id === itemid ? updateFavedList(item) : newVehicleList.push(item)));
            setVehicleList(newVehicleList);
            fetchData(favEntry);
          }}
        />
      )}
    </>
  );
};

const Card = (props: ICard) => {
  return (
    <div className={styles.Card}>
      <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
        <EditButton faved={props.faved} itemid={props.itemid} />
        <RemoveButton faved={props.faved} itemid={props.itemid} />
        <FavButton faved={props.faved} itemid={props.itemid} />
      </div>
      <h2 className={styles.h2}>{props.title}</h2>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Card;
