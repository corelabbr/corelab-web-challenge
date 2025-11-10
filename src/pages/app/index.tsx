import React, { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import { Button, Search, Navbar } from "../../components";
import styles from "./App.module.scss";
import { IVehicle } from "../../types/Vehicle";
import GranCard from "../../components/GranCard";
import { FieldValues, useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import Icone from "../../components/IconeStar";
import { AiFillEdit, AiFillStar, AiOutlineBgColors, AiOutlineClose } from "react-icons/ai";

const fetcher = (url: string)  => axios.get(url).then((res) => res.data)

const App = () => {
  const { register, handleSubmit } = useForm()
  const [search, setSearch] = useState<string>("");const [editMode, setEditMode] = useState(false);


  const handleWrite = async (data: FieldValues) => {
    const response = await axios.post('http://localhost:3003/post', data)
  }

  const { data } = useSWR('http://localhost:3003/get', fetcher)

  return (
    <>
    <Navbar placeholder="Search" value={search} onChange={(event: React.ChangeEvent<HTMLInputElement>) => event.target.value} />
      <div className={styles.Vehicles}>
          <form onSubmit={handleSubmit(handleWrite)}>
            <div className={styles.div1}>
              <input type="text" placeholder="Título" {...register('title')} name="title" />
              <textarea className={styles.textarea} typeof="text" placeholder="Clique ou arraste o arquivopara esta área para fazer upload" {...register('body')} name="body" />
            </div>
          </form>
          <main className={styles.main}>
            {
              data?.map((item: any) =>
              <GranCard title={item.title} body={item.body} key={item._id} id={item._id} fav={item.fav} />
              )
            }
          </main>
        </div>
    </>
  );
};

export default App;
