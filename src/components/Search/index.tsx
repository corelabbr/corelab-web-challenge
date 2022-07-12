import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { ICar } from "../../types/Car";
import Table from "../Table";
import Modal from "../Modal";
import styles from "./Search.module.scss";

interface ISearch {
  placeholder: string;
  value?: string;
  onChange: () => void;
}

const Search = (props: ISearch) => {
  const [carsList, setCarsList]: Array<ICar> | any = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = api
      .get("/cars")
      .then(({ data }) => setCarsList(data.data))
      .then((response) => console.log(response.data.data.toLowerCase));
  }, []);

  const search = (data: [ICar]) => {
    return data?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.brand.name.toLowerCase().includes(searchTerm)
    );
  };

  return (
    <div className={styles.searchCard}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder={props.placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Modal />
      </div>
      {searchTerm !== "" && <Table data={search(carsList)} />}
    </div>
  );
};

export default Search;
