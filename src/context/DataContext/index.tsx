import { atom, useAtom } from "jotai";
import { IVehicle } from "@/types/Vehicle";

const addState = atom(false);
const filterState = atom(false);
const searchState = atom("");
const searchArray = atom<IVehicle[]>([]);
const vehicleState = atom<IVehicle[]>([]);
const favedState = atom<IVehicle[]>([]);
const populateLists = atom<boolean>(false);
const addVehicle = atom<any>([]);
const addFilter = atom<any>([]);
const filteredArray = atom<IVehicle[]>([]);

const DataContext = () => {
  const [showAdd, setShowAdd] = useAtom(addState);
  const [showFilter, setShowFilter] = useAtom(filterState);
  const [searchValue, setSearchValue] = useAtom(searchState);
  const [vehicleList, setVehicleList] = useAtom(vehicleState);
  const [favedList, setFavedList] = useAtom(favedState);
  const [populatedLists, setPopulatedLists] = useAtom(populateLists);
  const [arraySearch, setArraySearch] = useAtom(searchArray);
  const [newVehicle, setNewVehicle] = useAtom(addVehicle);
  const [newFilter, setNewFilter] = useAtom(addFilter);
  const [arrayFiltered, setArrayFiltered] = useAtom(filteredArray);

  return {
    dataContext: {
      showAdd,
      setShowAdd,
      showFilter,
      setShowFilter,
      searchValue,
      setSearchValue,
      vehicleList,
      setVehicleList,
      favedList,
      setFavedList,
      populatedLists,
      setPopulatedLists,
      arraySearch,
      setArraySearch,
      newVehicle,
      setNewVehicle,
      newFilter,
      setNewFilter,
      arrayFiltered,
      setArrayFiltered,
    },
  };
};

export default DataContext;
