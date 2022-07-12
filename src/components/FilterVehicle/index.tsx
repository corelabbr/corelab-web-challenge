import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/FilterVehicle.module.scss";
import { BiArrowBack } from "react-icons/bi";
import Button from "../Button";
import Input from "../Input/Input";
import { useSelector } from "react-redux";
import { selectVehicle } from "../../redux/store";
const inputField = ["name", "color", "year", "price"];

interface IModel {
  setModel: Dispatch<SetStateAction<boolean>>;
}

const FilterVehicle = ({ setModel }: IModel) => {
  const { vehicles: vehiclesData } = useSelector(selectVehicle);
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [name, setName] = useState("");
  const [color, setcolor] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    switch (input) {
      case "name":
        setName(e.target.value);
        break;
      case "color":
        setcolor(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "year":
        setYear(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let filteredVehicles = vehicles;

    if (name !== "") {
      filteredVehicles = filteredVehicles.filter((car) => car.name);
      console.log(vehicles, name);
    }

    if (color !== "") {
      filteredVehicles = filteredVehicles.filter((car) => car.color === color);
    }

    if (price !== "") {
      filteredVehicles = filteredVehicles.filter(
        (car) => car.price < parseInt(price)
      );
    }

    if (year !== "") {
      filteredVehicles = filteredVehicles.filter(
        (car) => car.year < parseInt(year)
      );
    }

    setVehicles(filteredVehicles);
  }, [year, color, name, price]);

  return (
    <form className={styles.container}>
      <div className={styles.wrapper}>
        <BiArrowBack
          size={25}
          onClick={() => setModel(false)}
          className={styles.close}
        />
        <h1 className={styles.h1}>Filter</h1>

        {inputField.map((input) => (
          <Input
            value={input}
            id={input}
            type="text"
            onChange={(e) => handleFilterChange(e, input)}
          />
        ))}

        <Button text="Filter" onClick={() => {}} />
      </div>
    </form>
  );
};
export default FilterVehicle;
