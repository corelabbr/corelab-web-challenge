import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { api } from '../../services/api';
import { Container, Content, InputBox, ButtonBox } from './styles';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button } from '../Button';
import { Input } from '../Input';
import { useVehicles } from '../../services/hooks/useVehicles';
import { Select } from '../Select';
import { useState } from 'react';

interface UpdateModalProps {
  isOpen: boolean;
  onCloseRequest: () => void;
  vehicle?;
}

type IData = {
  brand: string;
  color: string;
  year: string;
  min: string;
  max: string;
};

export function FilterModal({ isOpen, onCloseRequest }: UpdateModalProps) {
  const { register, handleSubmit } = useForm();
  const { data } = useVehicles();

  const handleFilter = async (data: IData) => {
    try {
      const schema = Yup.object().shape({
        brand: Yup.string(),
        color: Yup.string(),
        year: Yup.string(),
        min: Yup.string(),
        max: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.get(
        `/vehicles/filter?brand=${data.brand}&color=${data.color}&year=${data.year}&min=${data.min}&max=${data.max}`,
      );

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container isOpen={isOpen}>
      <Content onSubmit={handleSubmit(handleFilter)}>
        <IoArrowBackOutline size={19.5} onClick={onCloseRequest} />
        <Select name="brand" label="Marca:" register={register}>
          <option selected>{''}</option>
          {data?.vehicles.map(vehicle => {
            return <option value={vehicle.brand}>{vehicle.brand}</option>;
          })}
        </Select>
        <Select name="color" label="Cor:" register={register}>
          <option selected>{''}</option>

          {data?.vehicles.map(vehicle => {
            return <option value={vehicle.color}>{vehicle.color}</option>;
          })}
        </Select>
        <Select name="year" label="Ano:" register={register}>
          <option selected>{''}</option>

          {data?.vehicles.map(vehicle => {
            return <option value={vehicle.year}>{vehicle.year}</option>;
          })}
        </Select>
        <InputBox>
          <Input
            variant="minmax"
            name="min"
            label="Preço min."
            register={register}
          />
          <Input
            variant="minmax"
            name="max"
            label="Preço max."
            register={register}
          />
        </InputBox>
        <ButtonBox>
          <Button isSave type="submit" />
        </ButtonBox>
      </Content>
    </Container>
  );
}
