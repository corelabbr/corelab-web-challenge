import { useEffect, useState } from "react";
import styles from "../../styles/vehicleModal.module.scss";
import { BiArrowBack } from "react-icons/bi";
import Button from "../Button";
import vehiclesSlice, {
  editVehicleById,
  addVehicle,
  getVehicleByIdStore,
  getVehiclesStore,
} from "../../redux/vehiclesSlice";
import { createVehicle, editVehicle, getVehicleById } from "../../lib/api";
import { IVehicle } from "../../types/Vehicle";
import { useDispatch } from "react-redux";
import { closeAddModal, closeEditModal } from "../../redux/modalSlice";
import Input from "../Input/Input";
import { inputsField } from "../../utils/inputsFields";
import { IModel } from "../../types/Model";

const VehicleModal = ({ text, type, id }: IModel) => {
  const [vehicleData, setVehicleData] = useState<IVehicle | any>([]);
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();

  const [vehicleInfo, setVehicleInfo] = useState({
    name: vehicleData.name,
    color: vehicleData.color,
    year: vehicleData.year,
    plate: vehicleData.plate,
    price: vehicleData.price,
    description: vehicleData.description,
    is_favorite: vehicleData.is_favorite,
  });

  useEffect(() => {
    const fetchVehicleData = async () => {
      if (id) {
        const carData = await getVehicleById(id);
        setVehicleData(carData);
      }
    };
    fetchVehicleData();
  }, [id]);


  // TODO: Refactor this function
  const clickHandler = async (e: any) => {
    e.preventDefault();
    
    if (type === "edit" && id) {
      try {
        const edited = {
          name: vehicleInfo.name || vehicleData.name,
          description: vehicleInfo.description || vehicleData.description,
          color: vehicleInfo.color || vehicleData.color,
          year: vehicleInfo.year || vehicleData.year,
          plate: vehicleInfo.plate || vehicleData.plate,
          price: vehicleInfo.price || vehicleData.price,
        };

        const { data } = await editVehicle(id, edited);
        dispatch(editVehicleById(data));
        dispatch(closeEditModal());
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (
          !vehicleInfo["name"] ||
          !vehicleInfo["description"] ||
          !vehicleInfo["color"] ||
          !vehicleInfo["year"] ||
          !vehicleInfo["plate"] ||
          !vehicleInfo["price"]
        ) {
          setMessage("All Fields are required");
          return;
        }

        const data = await createVehicle(vehicleInfo);
        const newVehicle = [data];
        dispatch(addVehicle([...newVehicle]));
        dispatch(closeAddModal());
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clickModalHandler = () => {
    dispatch(closeEditModal());
    dispatch(closeAddModal());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVehicleInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <form className={styles.container}>
      <div className={styles.wrapper}>
        <BiArrowBack
          size={25}
          onClick={clickModalHandler}
          className={styles.close}
        />
        <h1 className={styles.h1}>{text}</h1>
        {inputsField.map((input) => (
          <Input value={input} id={input} type="text" onChange={handleChange} />
        ))}
        <span className={styles.message}>{message}</span>
        {!message && <span className={styles.message}>{message}</span>}
        <Button text="salvar" onClick={clickHandler} />
      </div>
    </form>
  );
};
export default VehicleModal;
