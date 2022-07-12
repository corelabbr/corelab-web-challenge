import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './VehicleForm.module.scss';

import { IVehicle } from '../../types/Vehicle';

interface VehicleFormProps {
    handleSubmit: Function;
    vehicleData?: any;
}

export function VehicleForm({handleSubmit, vehicleData}: VehicleFormProps) {
    const [vehicle, setVehicle] = useState(vehicleData || {});


    const submit = (e: FormEvent) => {
        e.preventDefault();
        handleSubmit(vehicle);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    }

    return (
        <form action="" className={styles.form} onSubmit={submit}>
            <div className={styles.form__wrapper}>
                <div className={styles.form__item}>
                    <label className={styles.form__label}>
                        Nome:
                    </label>
                    <input 
                        className={styles.form__input}
                        type="text" 
                        name="name"
                        value={vehicle.name ? vehicle.name : ''}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.form__item}>
                    <label className={styles.form__label}>
                        Descrição:
                    </label>
                    <input 
                        className={styles.form__input}
                        type="text" 
                        name="description"
                        value={vehicle.description ? vehicle.description : ''}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.form__item}>
                    <label className={styles.form__label}>
                        Marca:
                    </label>
                    <input 
                        className={styles.form__input}
                        type="text" 
                        name="brand"
                        value={vehicle.brand ? vehicle.brand : ''}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.form__item}>
                    <label className={styles.form__label}>
                        Cor:
                    </label>
                    <input 
                        className={styles.form__input}
                        type="text" 
                        name="color"
                        value={vehicle.color ? vehicle.color : ''}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.form__item}>
                    <label className={styles.form__label}>
                        Preço:
                    </label>
                    <input 
                        className={styles.form__input}
                        type="text" 
                        name="price"
                        value={vehicle.price ? vehicle.price : ''}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.form__item}>
                    <label className={styles.form__label}>
                        Ano:
                    </label>
                    <input 
                        className={styles.form__input}
                        type="text" 
                        name="year"
                        value={vehicle.year ? vehicle.year : ''}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.form__item}>
                    <label className={styles.form__label}>
                        Placa:
                    </label>
                    <input 
                        className={styles.form__input}
                        type="text" 
                        name="plate"
                        value={vehicle.plate ? vehicle.plate : ''}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <footer className={styles.form__footer}>
                <button 
                    type='submit'
                    className={styles.form__button}
                >
                    salvar
                </button>
            </footer>
        </form>
    )
}