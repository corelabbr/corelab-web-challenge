import { FocusEvent } from "react";
import { useState } from "react";
import Button from "../Button";
import styles from "./Modal.module.scss";
import {
  validateName,
  validateDescription,
  validatePrice,
  validateColor,
  validatePlate,
  validateYear,
} from "../../assets/validate";
import { IValidation } from "../../types/Validation";
import { AddVehicle } from "../../lib/api";

interface IModal {
  statusModal: boolean;
  closeModal: () => void;
}

const Modal = (props: IModal) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [color, setColor] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [plate, setPlate] = useState<string>("");
  const [validations, setValidations] = useState<IValidation>({
    name: { isDirty: false, erros: [] },
    description: { isDirty: false, erros: [] },
    price: { isDirty: false, erros: [] },
    color: { isDirty: false, erros: [] },
    year: { isDirty: false, erros: [] },
    plate: { isDirty: false, erros: [] },
  });

  const handleAddCar = () => {
    if (
      validations.name.isDirty &&
      validations.description.isDirty &&
      validations.price.isDirty &&
      validations.color.isDirty &&
      validations.year.isDirty &&
      validations.plate.isDirty &&
      validations.name.erros.length === 0 &&
      validations.description.erros.length === 0 &&
      validations.price.erros.length === 0 &&
      validations.color.erros.length === 0 &&
      validations.year.erros.length === 0 &&
      validations.plate.erros.length === 0
    ) {
      AddVehicle({
        name,
        description,
        price,
        color,
        year,
        plate,
        isfavorite: false,
      });
    }
  };

  const validateComponent = ($event: FocusEvent<HTMLInputElement>) => {
    const { id, value } = $event.target;
    let erros: any[];
    let newValidations = validations;

    switch (id) {
      case "name":
        erros = validateName(value);
        setName(value);
        newValidations.name.isDirty = true;
        break;

      case "description":
        erros = validateDescription(value);
        setDescription(value);
        break;

      case "price":
        erros = validatePrice(parseInt(value));
        setPrice(parseInt(value));
        break;

      case "color":
        erros = validateColor(value);
        setColor(value);
        break;

      case "year":
        erros = validateYear(parseInt(value));
        setYear(parseInt(value));
        break;

      case "plate":
        erros = validatePlate(value);
        setPlate(value);
        break;

      default:
        erros = [];
    }

    newValidations[id].isDirty = true;
    newValidations[id].erros = erros;
    setValidations(newValidations);
  };

  return (
    <div className={styles.ModalWraper}>
      <div className={styles.Modal}>
        <form>
          <h1>Adicionar Veiculo</h1>
          <div className={styles.Half}>
            <label htmlFor="name">
              Nome:
              <input
                placeholder="Supra MK4"
                id="name"
                onBlur={validateComponent}
              />
              <p>{validations.name.isDirty && validations.name.erros[0]}</p>
            </label>
            <label htmlFor="price">
              Valor:
              <input
                placeholder="1.000.000"
                id="price"
                type="number"
                onBlur={validateComponent}
              />
              <p>{validations.price.isDirty && validations.price.erros[0]}</p>
            </label>
          </div>

          <div className={styles.Half}>
            <label htmlFor="color">
              Cor:
              <input
                placeholder="vermelho"
                id="color"
                onBlur={validateComponent}
              />
              <p>{validations.color.isDirty && validations.color.erros[0]}</p>
            </label>

            <label htmlFor="year">
              Ano:
              <input
                placeholder="1993"
                id="year"
                type="number"
                onBlur={validateComponent}
              />
              <p>{validations.year.isDirty && validations.year.erros[0]}</p>
            </label>

            <label htmlFor="plate">
              Placa:
              <input
                placeholder="red-9696"
                id="plate"
                onBlur={validateComponent}
              />
              <p>{validations.plate.isDirty && validations.plate.erros[0]}</p>
            </label>
          </div>
          <div className={styles.half}>
            <label htmlFor="description">
              Descrição:
              <input
                placeholder="Turbo e Motor modificados"
                id="description"
                onBlur={validateComponent}
              />
              <p>
                {validations.description.isDirty &&
                  validations.description.erros[0]}
              </p>
            </label>
          </div>
          <div className={styles.Buttons}>
            <Button onClick={handleAddCar} text="Add Vehicle" destaque={true} />
            <Button onClick={props.closeModal} text="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
