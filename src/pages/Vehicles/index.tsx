import {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';

import styles from './Vehicles.module.scss';
import {
  Button, Card, Search, Modal,
} from '../../components';
import { IVehicle } from '../../types/Vehicle';
import { createVehicle, getVehicles, getVehiclesFavorites } from '../../lib/api';
import { menuMobileContext } from '../../providers/MenuMobile';
import { UserContext } from '../../providers/UserAuthenticate';

type typeFilters = {
  brand?: string;
  color?: string;
  year?: number;
  maxValue?: number;
  minValue?: number;
}

const VehiclesPage = () => {
  const { menuOpen } = useContext(menuMobileContext);
  const { token: userToken, sigIn, user } = useContext(UserContext);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [vehiclesFavorites, setVehiclesFavorites] = useState<IVehicle[]>([]);
  const [vehiclesFiltered, setVehiclesFiltered] = useState<IVehicle[]>([]);
  const [newVehicle, setNewVehicle] = useState<IVehicle>({} as IVehicle);

  const [search, setSearch] = useState<string>('');
  const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);
  const [loadingAll, setLoadingAll] = useState<boolean>(true);

  const [openModalSave, setOpenModalSave] = useState<boolean>(false);
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [availableFavorites, setAvailableFavorites] = useState<boolean>(false);

  const [filter, setFilter] = useState<typeFilters>({});
  const [colorsFilter, setColorsFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<number[]>([]);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);

  const reloadVehicles = async () => {
    setLoadingAll(true);
    setLoadingFavorites(true);

    setVehicles((await getVehicles()).data);
    setVehiclesFavorites((await getVehiclesFavorites(userToken)).data);
    setLoadingAll(false);
    setLoadingFavorites(false);
  };

  const filterFavorites = () => {
    const filtered = vehicles.filter((vehicle) => !vehiclesFavorites
      .some((favorite) => favorite.id === vehicle.id));
    return filtered;
  };

  const filterVehicles = (arrVehicles: IVehicle[]) => {
    const filtered = arrVehicles.filter((vehicle: IVehicle) => (
      (filter.brand ? filter.brand === vehicle.brand : false)
      || (filter.year ? filter.year === vehicle.year : false)
      || (filter.color ? filter.color === vehicle.color : false)
      || (filter.minValue ? filter.minValue <= vehicle.price : false)
      || (filter.maxValue ? filter.maxValue >= vehicle.price : false)
    ));
    return filtered;
  };

  useEffect(() => {
    const login = async () => {
      sigIn();
      if (userToken) {
        setLoadingFavorites(true);
        const response = await getVehiclesFavorites(userToken);
        setVehiclesFavorites(response.data);
        setLoadingFavorites(false);
      }
    };

    login();
  }, [userToken]);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoadingAll(true);
      const payload = await getVehicles();
      setVehicles(payload.data);
      setLoadingAll(false);
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const filtered = filterFavorites();
    setVehicles(filtered);
  }, [availableFavorites]);

  useEffect(() => {
    if (!loadingAll && !loadingFavorites) {
      setAvailableFavorites(!availableFavorites);
    }
  }, [loadingAll, loadingFavorites]);

  useEffect(() => setIsModalOpen(!isModalOpen), [openModalSave, openModalFilter]);

  useEffect(() => {
    setColorsFilter(Array.from(
      new Set(vehicles.map((vehicle: IVehicle) => vehicle.color)),
    ));

    setYearFilter(Array.from(
      new Set(vehicles.map((vehicle: IVehicle) => vehicle.year)),
    ));

    setBrandFilter(Array.from(
      new Set(vehicles.map((vehicle: IVehicle) => vehicle.brand)),
    ));
  }, [vehicles]);

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleFilter = (e:ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilter({
      ...filter,
      [id]: value,
    });
  };

  const handleSaveFilter = () => {
    const filtered = [...filterVehicles(vehicles), ...filterVehicles(vehiclesFavorites)];
    setVehiclesFiltered(filtered);
    setOpenModalFilter(false);
  };

  const handleClearFilter = () => {
    setFilter({});
    setVehiclesFiltered([]);
    setOpenModalFilter(false);
  };

  const handleNewCar = (e:ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewVehicle({
      ...newVehicle,
      [id]: value,
    });
  };
  const handleSubmitNewCar = async () => {
    setOpenModalSave(false);

    const vehicleSaved = await createVehicle(newVehicle, userToken);
    setVehicles([vehicleSaved, ...vehicles]);
    setNewVehicle({
      ...newVehicle,
      name: '',
      brand: '',
      color: '',
      year: 0,
      price: 0,
      plate: '',
      description: '',

    });
  };

  return (
    <div className={styles.Vehicles}>

      <main className={styles.main}>
        <div className={styles.wrapperSearch}>
          <Search
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
          <button
            type="button"
            className={styles.btn}
            name="filter"
            onClick={() => { setOpenModalFilter(true); setIsModalOpen(true); }}
          >
            <GiSettingsKnobs size={32} className={styles.icon} />
          </button>
        </div>

        <Button
          isLogged={!!userToken}
          text="Add new vehicle"
          onClick={() => setOpenModalSave(true)}
        />
        {
          !loadingAll && vehicles.length === 0
          && <div className={styles.empty}>No vehicles found</div>
        }

        <div className={!isModalOpen || menuOpen ? styles.hidden : ''}>
          { vehiclesFiltered.length > 0 && (
          <div>
            <h1>Filtrados</h1>
            <div className={styles.wrapperCards}>
              { vehiclesFiltered.map((vehicle) => (
                <Card
                  title={vehicle.name}
                  color={vehicle.color}
                  key={`${vehicle.name}-${vehicle.id}`}
                  idVehicle={vehicle.id}
                  isFavorite={vehiclesFavorites.some((favorite) => favorite.id === vehicle.id)}
                  changeFavorite={reloadVehicles}
                >
                  <p>Brand: {vehicle.brand}</p>
                  <p>Price: {vehicle.price}</p>
                  <p>Description: {vehicle.description}</p>
                  <p>Year: {vehicle.year}</p>
                  <p>Color: {vehicle.color}</p>
                </Card>
              ))}
            </div>
          </div>
          )}

          { !loadingFavorites && vehiclesFiltered.length <= 0 && vehiclesFavorites.length > 0 && (
            <div>
              <h1>Favoritos</h1>
              <div className={styles.wrapperCards}>
                { vehiclesFavorites.map((vehicle) => (
                  <Card
                    title={vehicle.name}
                    color={vehicle.color}
                    key={`${vehicle.name}-${vehicle.id}`}
                    idVehicle={vehicle.id}
                    isFavorite
                    changeFavorite={reloadVehicles}
                  >
                    <p>Brand: {vehicle.brand}</p>
                    <p>Price: {vehicle.price}</p>
                    <p>Description: {vehicle.description}</p>
                    <p>Year: {vehicle.year}</p>
                    <p>Color: {vehicle.color}</p>
                  </Card>
                ))}
              </div>
            </div>

          )}

          { !loadingAll && vehicles.length > 0 && vehiclesFiltered.length <= 0 && (
            <div>
              <h1>Todos</h1>
              <div className={styles.wrapperCards}>
                { vehicles.reverse().map((vehicle) => (
                  <Card
                    isProprietary={vehicle.user.id === user.id}
                    title={vehicle.name}
                    color={vehicle.color}
                    key={`${vehicle.name}-${vehicle.id}`}
                    idVehicle={vehicle.id}
                    changeFavorite={reloadVehicles}
                  >
                    <p>Brand: {vehicle.brand}</p>
                    <p>Price: {vehicle.price}</p>
                    <p>Description: {vehicle.description}</p>
                    <p>Year: {vehicle.year}</p>
                    <p>Color: {vehicle.color}</p>
                  </Card>
                ))}
              </div>
            </div>

          )}
        </div>

        <div className={openModalSave ? '' : styles.hidden}>
          <Modal setOpenModal={setOpenModalSave} title="Save">
            <form className={styles.formSave}>
              <div className={styles.wrapperInput}>
                <label htmlFor="name">
                  <span>Name:</span>
                  <input
                    placeholder="Name"
                    type="text"
                    id="name"
                    onChange={handleNewCar}
                    value={newVehicle.name}
                  />
                </label>
                <label htmlFor="brand">
                  <span>Brand:</span>
                  <input
                    placeholder="Brand"
                    type="text"
                    id="brand"
                    onChange={handleNewCar}
                    value={newVehicle.brand}
                  />
                </label>
                <label htmlFor="color">
                  <span>Color:</span>
                  <input
                    placeholder="Color"
                    type="text"
                    id="color"
                    onChange={handleNewCar}
                    value={newVehicle.color}
                  />
                </label>
                <label htmlFor="year">
                  <span>Year:</span>
                  <input
                    placeholder="Year"
                    type="number"
                    id="year"
                    onChange={handleNewCar}
                    value={newVehicle.year || ''}
                  />
                </label>
                <label htmlFor="price">
                  <span>Price:</span>
                  <input
                    placeholder="Price"
                    type="number"
                    id="price"
                    min="0"
                    onChange={handleNewCar}
                    value={newVehicle.price || ''}
                  />
                </label>
                <label htmlFor="description">
                  <span>Description:</span>
                  <input
                    placeholder="Description"
                    type="text"
                    id="description"
                    onChange={handleNewCar}
                    value={newVehicle.description}
                  />
                </label>
                <label htmlFor="plate">
                  <span>Plate:</span>
                  <input
                    placeholder="Plate"
                    type="text"
                    id="plate"
                    onChange={handleNewCar}
                    value={newVehicle.plate}
                  />
                </label>
              </div>

              <div className={styles.wrapperBtn}>
                <button
                  type="button"
                  onClick={handleSubmitNewCar}
                >Save
                </button>
                <button type="button" onClick={() => setOpenModalSave(false)}>Cancel</button>
              </div>
            </form>
          </Modal>
        </div>

        <div className={openModalFilter ? '' : styles.hidden}>
          <Modal setOpenModal={setOpenModalFilter} title="Filter">
            <form className={styles.formFilter}>
              <div className={styles.wrapperInput}>
                <label htmlFor="brand">
                  <span>Brand:</span>
                  <select
                    name="brand"
                    id="brand"
                    onChange={handleFilter}
                  >
                    {brandFilter.map((brand) => (
                      <option key={brand} value={brand} id={brand}>{brand}</option>
                    ))}
                    <option key="zero" value=""> </option>
                  </select>
                </label>

                <label htmlFor="color">
                  <span>Color:</span>
                  <select id="color" onChange={handleFilter}>
                    { colorsFilter.map((color) => (
                      <option key={color} value={color} id={color}>{color}</option>
                    ))}
                    <option key="zero" value=""> </option>

                  </select>
                </label>

                <label htmlFor="year">
                  <span>Year:</span>
                  <select id="year" onChange={handleFilter}>
                    { yearFilter.map((year) => (
                      <option key={year} value={year} id={`${year}`}>{year}</option>
                    ))}
                    <option key="zero" value=""> </option>

                  </select>
                </label>

                <label htmlFor="minValue">
                  <span>Min value:</span>
                  <input
                    placeholder="Min value"
                    type="number"
                    id="minValue"
                    onChange={handleFilter}
                  />
                </label>

                <label htmlFor="maxValue">
                  <span>Max value:</span>
                  <input
                    placeholder="Max value"
                    type="number"
                    id="maxValue"
                    onChange={handleFilter}
                  />
                </label>
              </div>

              <div className={styles.wrapperBtn}>
                <button type="button" onClick={handleSaveFilter}>Filter</button>
                <button type="button" onClick={() => setOpenModalFilter(false)}>Cancel</button>
                <button type="button" onClick={handleClearFilter}>Clear</button>
              </div>

            </form>
          </Modal>
        </div>
      </main>
    </div>

  );
};

export default VehiclesPage;
