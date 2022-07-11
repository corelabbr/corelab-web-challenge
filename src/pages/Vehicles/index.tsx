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

  const { showAdd, setShowAdd, showFilter, setShowFilter, searchValue, setSearchValue, vehicleState, setVehicleState } =
    dataContext;
  const { fetchData, dataResponse, loading, erro } = axiosRequest;

  useEffect(() => {
    if (dataResponse.length === 0) {
      fetchData({ ...downloadVehicles });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadVehicles]);

  useEffect(() => {
    if (dataResponse.length !== 0) {
      console.log(dataResponse);
    }
  }, [dataResponse]);

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

        <div>
          <p
            style={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "24px",
              justifySelf: "left",
              color: "#020202",
              paddingBottom: "10px",
            }}
          >
            Meus anúncios
          </p>
          <Card title='Sandero Stepway'>
            <p>Price: 22000</p>
            <p>Description: Carro usado por 2 anos...</p>
            <p>Year: 2018</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VehiclesPage;
