import React, { useState, useEffect } from "react";
import styles from "./Edit.module.scss";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { ICar } from "../../types/Car";
import { IBrand } from "../../types/Brand";

const Edit = () => {
  let { id } = useParams();

  return <p>ID: {id}</p>;
};

export default Edit;
