import Filtro from "../../assets/icons8-opções-de-ordenação-50.png";
import Lupa from "../../assets/iconeLupa.svg";
import "./style.css";

export default function Header({ setOpenForm }) {
  function handleEdit() {}
  return (
    <>
      <div className="input-wrapper ">
        <img className="lupa" src={Lupa} onClick={() => handleEdit()} />
        <input
          type="text"
          placeholder="Buscar"
          className="input-search"
          // onChange={value => setCarName(value.target.value)}
        ></input>
        <img src={Filtro} />
      </div>

      <button className="btn-header" onClick={() => setOpenForm(true)}>
        ADICIONAR
      </button>
    </>
  );
}
