import React, { useState } from "react";
import styles from "./Vehicles.module.scss";
import {
  Button,
  Search,
  Add,
  Edit,
  Card,
  Filter,
  Modal,
} from "../../components";
import {
  getVehicles,
  deleteVehicle,
  updateVehicle,
  searchVehicles,
} from "../../lib/api";
import { useEffect } from "react";
const VehiclesPage = () => {
  const [visebleAdd, setVisibleAdd] = useState(false);
  const [visebleEdit, setVisibleEdit] = useState(false);
  const [visebleFilter, setVisibleFilter] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  const toggleVisibleAdd = () => setVisibleAdd(!visebleAdd);
  const toggleVisibleEdit = () => setVisibleEdit(!visebleEdit);
  const toggleVisibleFilter = () => setVisibleFilter(!visebleFilter);

  const getV = async () => {
    setRefresh(false);
    const res = await getVehicles();
    return setVehicles(res);
  };

  const deleteV = async (id) => {
    return await deleteVehicle(id)
      .then((res) => {
        alert("Removido");
        getV();
      })
      .catch(() => alert("Erro ao remover"));
  };
  const favoriteV = async (id, isFav) => {
    const body = {
      id: id,
      isFavorite: !isFav,
    };
    return await updateVehicle(body).then((res) => getV());
  };

  const searchV = async () => {
    if (!search.length) {
      getV();
    } else {
      await searchVehicles("?q=" + search)
        .then((res) => {
          if (res.length) {
            setVehicles(res);
          } else {
            alert("Sem resultados!");
          }
        })
        .catch((err) => {
          alert("Erro ao pesquisar!");
        });
    }
  };
  useEffect(() => {
    getV();
  }, []);
  if (refresh) {
    setVisibleAdd(false);
    setVisibleEdit(false);
    setVisibleFilter(false);
    getV();
  }

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <header>
          <Search
            onOpenFilter={toggleVisibleFilter}
            search={search}
            setSearch={setSearch}
            onSearch={searchV}
          />
          <div className={styles.buttonAddDiv}>
            <div className={styles.buttonAdd}>
              <Button text="ADICIONAR" onClick={toggleVisibleAdd} />
            </div>
          </div>
        </header>

        {visebleAdd ? (
          <Modal>
            <Add onClose={toggleVisibleAdd} setRefresh={setRefresh} />
          </Modal>
        ) : (
          <></>
        )}
        {visebleEdit ? (
          <Modal>
            <Edit
              onClose={toggleVisibleEdit}
              vehicle={vehicle}
              setRefresh={setRefresh}
            />
          </Modal>
        ) : (
          <></>
        )}
        {visebleFilter ? (
          <Modal>
            <Filter setVehicles={setVehicles} setClose={toggleVisibleFilter} />
          </Modal>
        ) : (
          <></>
        )}
        <div className={styles.cards}>
          {vehicles.length ? (
            vehicles.map((item) => {
              return (
                <Card
                  title={item.name}
                  key={item.id}
                  color={item.color}
                  onEdit={() => {
                    setVehicle(item);
                    toggleVisibleEdit();
                  }}
                  onDelete={() => {
                    deleteV(item.id);
                  }}
                  isFav={item.isFavorite}
                  onFavorite={() => favoriteV(item.id, item.isFavorite)}
                >
                  <p>Nome: {item.name}</p>
                  <p>Cor: {item.color}</p>
                  <p>Ano: {item.year}</p>
                  <p>Placa: {item.plate}</p>
                  <p>Preço: {item.price}</p>
                  <p>Descrição: {item.description}</p>
                </Card>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
};

export default VehiclesPage;
