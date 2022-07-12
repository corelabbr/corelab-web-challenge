import { ChangeEvent } from 'react';
import { IVehicle } from '../../types/Vehicle';
import styles from './styles.module.scss';

type propsForm = {
  handleNewCar: (e:ChangeEvent<HTMLInputElement>) => void,
  handleSubmitNewCar: () => void,
  setOpenModalSave: (value:boolean) => void,
  newVehicle: IVehicle
}

export const FormVehicle = ({
  handleNewCar, newVehicle, handleSubmitNewCar, setOpenModalSave,
}: propsForm) => (
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
);
