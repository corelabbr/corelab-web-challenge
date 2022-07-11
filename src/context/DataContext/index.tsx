import React from "react";
import { atom, useAtom } from "jotai";
import { IVehicle } from "@/types/Vehicle";

const addState = atom(false);
const filterState = atom(false);
const searchState = atom("");
const vehicleList = atom<IVehicle[]>([]);

const DataContext = () => {
  const [showAdd, setShowAdd] = useAtom(addState);
  const [showFilter, setShowFilter] = useAtom(filterState);
  const [searchValue, setSearchValue] = useAtom(searchState);
  const [vehicleState, setVehicleState] = useAtom(vehicleList);

  return {
    dataContext: {
      showAdd,
      setShowAdd,
      showFilter,
      setShowFilter,
      searchValue,
      setSearchValue,
      vehicleState,
      setVehicleState,
    },
  };
};

export default DataContext;
