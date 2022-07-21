import axios from "axios";
import editar from "../../assets/icon-editar.svg";
import heart from "../../assets/icons8-copas-32.png";
import fechar from "../../assets/icons8-excluir.svg";
import "./style.css";

function ModalCar(cars) {
  function handleFavorite() {
    axios
      .post(`http://localhost:4731/favorite/${cars.id}`, {
        id: cars.id,
      })
      .then((response) => {
        console.log(response);
      });
    window.location.href = "/";
  }

  function handleDelete() {
    axios
      .post(`http://localhost:4731/delete/${cars.id}`, {
        id: cars.id,
      })
      .then((response) => {
        console.log(response);
      });
    window.location.href = "/";
  }

  return (
    <div className="card" style={{ backgroundColor: cars.color }}>
      <div className="header">
        <div className="icons">
          <img src={editar} />

          <img
            src={fechar}
            onClick={() => handleDelete()}
            className="header-icons"
          />
          <img src={heart} onClick={() => handleFavorite()} />
        </div>
        <div className="content">
          <p>
            <strong>{cars.name}</strong>
          </p>
          <p>
            <strong>Preço:</strong> {cars.price}
          </p>
          <p className="description">
            <strong>Descrição:</strong> Loremi{cars.description}
          </p>
          <p>
            <strong>Ano:</strong> {cars.year}
          </p>
          {/* <p><strong>Cor:</strong></p> */}
        </div>
      </div>
    </div>
  );
}

export default ModalCar;
