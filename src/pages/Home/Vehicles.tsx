import { useState, useEffect } from 'react';
import styles from './Vehicles.module.scss';
import { MagnifyingGlass, Sliders } from 'phosphor-react'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card';

import { IVehicle } from '../../types/Vehicle';
import api from '../../lib/api';

export function Vehicles() {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filteredResults, setFilteredResults] = useState<IVehicle[]>([]);

    const getVehicles = () => {
        api.get("/vehicles")
            .then(response => {
                setVehicles(response.data);
            })
            .catch(err => console.log(err));
        }

    useEffect(getVehicles, []);

    const searchItems = (searchValue: string) => {
        setSearch(searchValue);
        if (search !== '') {
          const filteredData = vehicles.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
          })
          setFilteredResults(filteredData);
        }
        else {
          setFilteredResults(vehicles)
        }
      }

    return (
        <div className={styles.home__container}>
            <div className={styles.search}>
                <header className={styles.search__header}>
                    <div className={styles.search__wrapper}>
                        <span>
                            <MagnifyingGlass size={20} weight="light" className={styles.search__glass} />
                        </span>
                        <input 
                            className={styles.search__input} 
                            type="text" 
                            placeholder="Buscar" 
                            onChange={(e) => searchItems(e.target.value)}
                        />
                        <div>
                            <Sliders size={40} weight="light" className={styles.search__sliders} />
                        </div>
                    </div>
                </header>
                <Button 
                    text={'ADICIONAR'}
                />
            </div>

            <div className={styles.card__container}>
                {search.length > 1 ? (
                    filteredResults.map((vehicle, index) => (
                        <Card
                            key={index}
                            id={vehicle.id}
                            name={vehicle.name} 
                            description={vehicle.description} 
                            color={vehicle.color}
                            year={vehicle.year}
                            plate={vehicle.plate}
                            price={vehicle.price}
                            isFavorite={vehicle.isFavorite}
                        />
                    ))
                ) : (
                    vehicles.map((vehicle, index) => (
                        <Card
                            key={index}
                            id={vehicle.id}
                            name={vehicle.name} 
                            description={vehicle.description} 
                            color={vehicle.color}
                            year={vehicle.year}
                            plate={vehicle.plate}
                            price={vehicle.price}
                            isFavorite={vehicle.isFavorite}
                        />
                    )))}
            </div>
        </div>
    )
}