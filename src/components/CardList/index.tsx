import { IVehicle } from "../../types/Vehicle";
import Card from "../Card";
import styles from "./CardList.module.scss";

interface ICarList {
  vehiclesList: IVehicle[];
  search: string;
}

const CardList = ({ vehiclesList, search }: ICarList) => {
  let filteredVehicles = vehiclesList.filter(
    ({ name, plate, price, description, color, year }) =>
      name.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase()) ||
      plate.toLowerCase().includes(search.toLowerCase()) ||
      price.toString().includes(search.toLowerCase()) ||
      color.toLowerCase().includes(search.toLowerCase()) ||
      year.toString().includes(search.toLowerCase())
  );

  return (
    <div className={styles.CardList}>
      {filteredVehicles.map((car, index) => (
        <Card vehicle={car} key={index} />
      ))}
    </div>
  );
};

export default CardList;
