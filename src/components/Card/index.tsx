import { IVehicle } from "../../types/Vehicle";
import * as C from "./Card.Style";
import { RiDeleteBin2Line, RiEdit2Line, RiHeartAddLine } from "react-icons/ri";
import { favoriteVehicle, deleteVehicle } from "../../lib/api";

interface ICard {
  vehicle: IVehicle;
}

const Card = ({ vehicle }: ICard) => {
  const deleteCar = () => {
    document.location.reload();
    deleteVehicle(vehicle.id);
  };

  return (
    <C.Container colorItem={vehicle.color}>
      <div className="top">
        <h2>{vehicle.name}</h2>
        <i
          onClick={() => {
            favoriteVehicle(vehicle.id);
          }}
        >
          <RiHeartAddLine />
        </i>
        <i onClick={deleteCar}>
          <RiDeleteBin2Line />
        </i>
        <i>
          <RiEdit2Line />
        </i>
      </div>

      <div>
        <p>
          Price:{" "}
          {vehicle.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}
        </p>
        <p>Color: {vehicle.color}</p>
        <p>year: {vehicle.year}</p>
        <p>Plate: {vehicle.plate}</p>
        <p>Description: {vehicle.description}</p>
      </div>
    </C.Container>
  );
};

export default Card;
