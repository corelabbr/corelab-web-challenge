import React, { ReactNode, useState } from "react";
import styles from "./Card.module.scss";
import Icone from "../IconeStar";

import { AiFillStar } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineBgColors } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import useSWR from "swr";
import axios from "axios";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import IconeStar from "../IconeStar/index";
import IconeEdit from "../IconeEdit/index";
import IconeColor from "../IconeColor/index";
import IconeClose from "../IconeClose/index";
import ColorItem from "../Color/index";

interface IGranCard {
  title: string,
  body: string,
  id: string,
  fav: boolean
}

const colors = ['#ec9679', '#9fec79', '#79b3ec', "white"]

const fetcher = (url: string)  => axios.get(url).then((res) => res.data)

const GranCard = (props: IGranCard) => {
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit } = useForm()

  const handleEditClick = async () => {
    setEditMode(!editMode)
    if (editMode) {
      const response = await axios.patch(`http://localhost:3003/patch/${props.id}`, {
        title: data.title,
        body: data.body,
        id: props.id,
        fav: editMode
      });
    }
  };

  const { data } = useSWR('http://localhost:3003/get', fetcher)

  // Função para enviar as alterações ao servidor (PATCH)
  const handlePatchData = async (data: FieldValues) => {
      try {
        const response = await axios.patch(`http://localhost:3003/patch/${props.id}`, {
          title: data.title,
          body: data.body,
          id: props.id,
          fav: editMode
        });
      } catch (error) {
        console.error('Erro ao atualizar os dados:', error);
      }
  }

  const handleDel = async () => {
    const response = await axios.delete(`http://localhost:3003/delete/${props.id}`)
  }

  const setColor = (color: string) => {
    document.documentElement.style.setProperty('--bg-color', color)
}

const setTheme = (event: React.MouseEvent<HTMLDivElement>) => {
  const target = event.target as HTMLElement
  const currentColor = window.getComputedStyle(target).getPropertyValue('--bg-color')
  console.log(currentColor);
}


  return (
    <div className={styles.GranCard}>
              <IconeStar onClick={() => {
                handleEditClick()
              }}
              state={props.fav}
            />
      <form onSubmit={handleSubmit(handlePatchData)}>
        <div className={styles.div1}>
          <input type="text" placeholder={props.title} {...register('title')} name="title" />
        </div>
        <textarea className={styles.textarea} typeof="text" placeholder={props.body} {...register('body')} name="body" />
        </form>
        <div className={styles.div2}>
          <div className={styles.div3}>
            <IconeEdit onClick={function (): void {
            throw new Error("Function not implemented.");
          } } />
            <IconeColor id={props.id} onClick={() => {}} >
              <div className={styles.list}>
                {colors.map((color, idx) => 
                  <ColorItem id={props.id} key={idx} color={color} setColor={setColor} />
                )}
      </div>
      <AiOutlineBgColors />
            </IconeColor>
          </div>
          <div>
            <IconeClose onClick={() => {handleDel()}} />
          </div>
        </div>
    </div>
  );
};

export default GranCard;
