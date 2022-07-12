/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, Card, Search, FilterButton } from "@/components";
import { vehicleInfo, filterVehicle, priceVehicle } from "@/data";
import { DataContext } from "@/context";
import { useAxios } from "@/hooks";
import AddVehicle from "@/pages/AddVehicle";
import FilterVehicle from "@/pages/FilterVehicle";
import styles from "./Vehicles.module.scss";

const downloadVehicles = {
  url: "/download",
  method: "get",
};

const VehiclesPage = () => {
  const { axiosRequest } = useAxios();
  const { dataContext } = DataContext();

  const {
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
    setArrayFiltered,
    arrayFiltered,
  } = dataContext;
  const { fetchData, dataResponse } = axiosRequest;

  useEffect(() => {
    if (dataResponse.length === 0) {
      fetchData(downloadVehicles);
    }
  }, []);

  useEffect(() => {
    if (showAdd === false) {
      setPopulatedLists(false);
      setFavedList([]);
      setVehicleList([]);
      fetchData(downloadVehicles);
    }
  }, [showAdd]);

  useEffect(() => {
    if (dataResponse.length !== 0 && populatedLists === false) {
      setPopulatedLists(true);
      dataResponse.map((item: any) =>
        item?.isFavorite === false
          ? setVehicleList((prev: any) => [...prev, item])
          : setFavedList((prev: any) => [...prev, item])
      );
    }
  }, [dataResponse]);

  useEffect(() => {
    if (searchValue.length > 0) {
      let validator = new RegExp(`[a-zA-ZÀ-ü]?[${searchValue}][a-zA-ZÀ-ü]?`, "gi");
      let suggestList = vehicleList.filter((item) => item.name.match(validator));
      let suggestListFaved = favedList.filter((item) => item.name.match(validator));
      suggestList.push(...suggestListFaved);
      setArraySearch([...suggestList]);
    } else {
      setArraySearch([]);
      setSearchValue("");
    }
  }, [searchValue]);

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <div className={styles.container}>
          <Search
            placeholder='Buscar'
            value={searchValue}
            onChange={({ target }) => {
              setSearchValue(target.value);
            }}
          />
          <FilterButton onClick={() => setShowFilter(true)} />
        </div>

        <Button
          text='Adicionar'
          onClick={() => {
            setShowAdd(true);
          }}
        />
        {showAdd && <AddVehicle data={vehicleInfo} />}
        {showFilter && <FilterVehicle characFilter={filterVehicle} priceFilter={priceVehicle} />}

        {showAdd === false &&
          showFilter === false &&
          favedList.length > 0 &&
          arraySearch.length === 0 &&
          arrayFiltered.length === 0 && (
            <div>
              <p className={styles.sectionTitle}>Meus Favoritos</p>

              {favedList.map((item) => (
                <Card faved={true} title={item.name} key={item.id} itemid={item.id}>
                  <p>Price: {item.price}</p>
                  <p>Description: {item.description}</p>
                  <p>Year: {item.year}</p>
                  <p>Price: {item.price}</p>
                </Card>
              ))}
            </div>
          )}

        {showAdd === false &&
          showFilter === false &&
          vehicleList.length > 0 &&
          arraySearch.length === 0 &&
          arrayFiltered.length === 0 && (
            <div>
              <p className={styles.sectionTitle}>Meus Anúncios</p>

              {vehicleList.map((item) => (
                <Card faved={false} title={item.name} key={item.id} itemid={item.id}>
                  <p>Price: {item.price}</p>
                  <p>Description: {item.description}</p>
                  <p>Year: {item.year}</p>
                  <p>Price: {item.price}</p>
                </Card>
              ))}
            </div>
          )}

        {showAdd === false &&
          showFilter === false &&
          arrayFiltered.length === 0 &&
          searchValue.length > 0 &&
          arraySearch.length > 0 && (
            <div>
              <p className={styles.sectionTitle}>Resultados da busca</p>

              {arraySearch.map((item) => (
                <Card faved={false} title={item.name} key={item.id} itemid={item.id}>
                  <p>Price: {item.price}</p>
                  <p>Description: {item.description}</p>
                  <p>Year: {item.year}</p>
                  <p>Price: {item.price}</p>
                </Card>
              ))}
            </div>
          )}

        {showAdd === false &&
          showFilter === false &&
          arrayFiltered.length > 0 &&
          searchValue.length === 0 &&
          arraySearch.length === 0 && (
            <div>
              <p className={styles.sectionTitle}>Resultados Filtrados</p>

              {arrayFiltered.map((item) => (
                <Card faved={false} title={item.name} key={item.id} itemid={item.id}>
                  <p>Price: {item.price}</p>
                  <p>Description: {item.description}</p>
                  <p>Year: {item.year}</p>
                  <p>Price: {item.price}</p>
                </Card>
              ))}
              <button
                className={styles.Button}
                onClick={() => {
                  setArraySearch([]);
                  setArrayFiltered([]);
                  setSearchValue("");
                }}
              >
                Limpar Filtros
              </button>
            </div>
          )}
      </main>
    </div>
  );
};

export default VehiclesPage;
