import React from "react";
import styles from "../../assets/styles/components/taskCards.module.sass";
import Image from "next/image";
import Star from "../../assets/images/svg/star.svg";
import Pencil from "../../assets/images/svg/pencil.svg";
import Bucket from "../../assets/images/svg/bucket.svg";
import { IoMdClose } from "react-icons/io";

const TaskCards = ({ Task, Title }: any) => {
  return (
    <div className={styles.container}>
      <section className={styles.boxTitle}>
        <input type="text" placeholder="Titulo" />
        <Image src={Star} alt="icon star" />
      </section>
      <hr className={styles.line} />
      <section className={styles.boxTask}>
        <textarea
          name="tasksTxt"
          className={styles.tasksTxt}
          cols={30}
          rows={15}
          placeholder="digite aqui a nota..."
          style={{ resize: "none", width: "100%",height:"200px",border:"none" }}></textarea>
      </section>
      <div className={styles.boxEdits}>
        <Image src={Pencil} alt="icon star" />
        <Image src={Bucket} alt="icon star" />
        <IoMdClose className={styles.closeIcon} />
      </div>
    </div>
  );
};

export default TaskCards;
