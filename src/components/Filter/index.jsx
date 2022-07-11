import { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import { Input, Select, Button } from "../index";
import { filtersVehicles, searchVehicles } from "../../lib/api";

const Filter = ({ setVehicles, setClose }) => {
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [years, setYears] = useState([]);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("");

  const filterVehicle = async () => {
    let query = "?";

    if (brand.length) query += `brand=${brand}&`;
    if (color.length) query += `color=${color}&`;
    if (year.length) query += `year=${year}&`;
    if (min.length) query += `min=${min}&`;
    if (max.length) query += `max=${max}&`;

    return await searchVehicles(query)
      .then((res) => {
        setClose(true);
        if (res.length) {
          setVehicles(res);
        } else {
          alert("Sem resultados");
        }
      })
      .catch((err) => alert("Erro ao buscar"));
  };

  useEffect(() => {
    const filter = async () => {
      const res = await filtersVehicles();
      setBrands(res.brands);
      setColors(res.colors);
      setYears(res.years);
    };
    filter();
  }, []);
  return (
    <div className={styles.Main}>
      <div className={styles.divBack}>
        <button className={styles.buttonBack} onClick={setClose}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>
      <div className={styles.content}>
        <Select
          label="Marca"
          values={brands}
          onSelect={(e) => setBrand(e.target.value)}
        />
        <Select
          label="Cor"
          values={colors}
          onSelect={(e) => setColor(e.target.value.replace("#", "*"))}
        />
        <Select
          label="Ano"
          values={years}
          onSelect={(e) => setYear(e.target.value)}
        />
        <div className={styles.divPrice}>
          <div className={styles.inputDiv}>
            <Input
              label="Preço mín."
              placeholder="Preço mín."
              onChange={(e) => setMin(e.target.value)}
              value={min}
            />
          </div>
          <div className={styles.inputDiv}>
            <Input
              label="Preço máx."
              placeholder="Preço máx."
              onChange={(e) => setMax(e.target.value)}
              value={max}
            />
          </div>
        </div>

        <div className={styles.divButton}>
          <Button text="Salvar" onClick={filterVehicle} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
