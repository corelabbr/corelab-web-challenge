import {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';
import { Button, Card, Search } from '../../components';

import styles from './Vehicles.module.scss';
import { IVehicle } from '../../types/Vehicle';
import { getVehicles } from '../../lib/api';
import { menuMobileContext } from '../../providers/MenuMobile';
import { Modal } from '../../components/Modal';

type typeFilters = {
  brand?: string;
  color?: string;
  year?: number;
  maxValue?: number;
  minValue?: number;
}

const VehiclesPage = () => {
  const { menuOpen } = useContext(menuMobileContext);

  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [openModalSave, setOpenModalSave] = useState<boolean>(false);
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState<typeFilters>({});
  const [colorsFilter, setColorsFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<number[]>([]);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);

  const [vehiclesFiltered, setVehiclesFiltered] = useState<IVehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload.data);
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    setIsModalOpen(!isModalOpen);
  }, [openModalSave, openModalFilter]);

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
  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e:ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    console.log(e);

    const { id, value } = e.target;
    setFilter({
      ...filter,
      [id]: value,
    });
  };

  const handleSaveFilter = () => {
    const filtered = vehicles.filter((vehicle: IVehicle) => (
      (filter.brand ? filter.brand === vehicle.brand : false)
      || (filter.year ? Number(filter.year) === vehicle.year : false)
      || (filter.color ? filter.color === vehicle.color : false)
      || (filter.minValue ? filter.minValue <= vehicle.price : false)
      || (filter.maxValue ? filter.maxValue >= vehicle.price : false)
    ));

    setVehiclesFiltered(filtered);
    setOpenModalFilter(false);
  };

  const handleClearFilter = () => {
    setFilter({});
    setVehiclesFiltered([]);
    setOpenModalFilter(false);
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
          text="Add new vehicle"
          onClick={() => setOpenModalSave(true)}
        />
        { loading && <div className={styles.loading}>Loading...</div> }
        {
          !loading && vehicles.length === 0
          && <div className={styles.empty}>No vehicles found</div>
        }

        <div className={!isModalOpen || menuOpen ? styles.hidden : ''}>
          { !loading && vehicles.length > 0 && (
          <div className={styles.wrapperCards}>
            { (vehiclesFiltered.length > 0 ? vehiclesFiltered : vehicles).map((vehicle) => (
              <Card title={vehicle.name} color={vehicle.color} key={`${vehicle.name}-${vehicle.id}`}>
                <p>Price: {vehicle.price}</p>
                <p>Description: {vehicle.description}</p>
                <p>Year: {vehicle.year}</p>
                <p>Color: {vehicle.color}</p>
              </Card>
            ))}
          </div>
          )}
        </div>

        <div className={openModalSave ? '' : styles.hidden}>
          <Modal setOpenModal={setOpenModalSave} title="Save">
            <form className={styles.formSave}>
              <div className={styles.wrapperInput}>
                <label htmlFor="name">
                  <span>Name:</span>
                  <input placeholder="Name" type="text" id="name" />
                </label>
                <label htmlFor="brand">
                  <span>Brand:</span>
                  <input placeholder="Brand" type="text" id="brand" />
                </label>
                <label htmlFor="color">
                  <span>Color:</span>
                  <input placeholder="Color" type="text" id="color" />
                </label>
                <label htmlFor="year">
                  <span>Year:</span>
                  <input placeholder="Year" type="number" id="year" />
                </label>
                <label htmlFor="price">
                  <span>Price:</span>
                  <input placeholder="Price" type="number" id="price" min="0" />
                </label>
                <label htmlFor="description">
                  <span>Description:</span>
                  <input placeholder="Description" type="text" id="description" />
                </label>
                <label htmlFor="plate">
                  <span>Plate:</span>
                  <input placeholder="Plate" type="text" id="plate" />
                </label>
              </div>

              <div className={styles.wrapperBtn}>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setOpenModalSave(false)}>Cancel</button>
              </div>
            </form>
          </Modal>
        </div>

        <div className={openModalFilter ? '' : styles.hidden}>
          <Modal setOpenModal={setOpenModalFilter} title="Filter">
            <form className={styles.formFilter}>
              <div className={styles.wrapperInput}>
                <label htmlFor="description">
                  <span>Brand:</span>
                  <select name="brand" id="brand">
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
                  <input placeholder="Min value" type="number" id="minValue" onChange={handleFilter} />
                </label>
                <label htmlFor="maxValue">
                  <span>Max value:</span>
                  <input placeholder="Max value" type="number" id="maxValue" onChange={handleFilter} />
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
