import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { Search, Card } from "../../components";
import { ICar } from "../../types/Car";
import styles from "./Homepage.module.scss";
import { BsPencilSquare } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [carsList, setCarsList]: Array<ICar> | any = useState();
  useEffect(() => {
    api
      .get("/cars")
      .then((response) => setCarsList(response.data.data))
      .catch((err) => console.log(err));
  }, []);

  const [searchTerm, setSearchTerm] = useState();

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    if (!value) return;
    const url = `/cars?q=${value}`;

    api
      .get(url)
      .then((response) => console.log(response.data))
      .then(({ data }: any | void) => setSearchTerm(data));
  };

  console.log(searchTerm);
  return (
    <div>
      <main className={styles.main}>
        <Search placeholder="Search" onChange={() => handleInputChange} />
        <button className={styles.button}>
          <a href="/new">ADICIONAR</a>
        </button>
        <div>
          <h2>Favoritos</h2>
          <h2>Anúncios</h2>
          <div className={styles.cardList}>
            {carsList?.map((item: ICar) => (
              <Card key={item.name} title={item.name}>
                <p>{item.price}</p>
                <p>Ano</p>
                <p>{item.km}</p>
                <p>{item.description}</p>
                <div>
                  <Link to={`/edit/${item.id}`}>
                    <BsPencilSquare />
                  </Link>
                  <ImBin />
                  <AiFillHeart />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
