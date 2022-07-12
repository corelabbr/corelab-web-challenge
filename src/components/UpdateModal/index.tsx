import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { api } from '../../services/api';
import { Container, Content } from './styles';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button } from '../Button';
import { Input } from '../Input';
import { useVehicles } from '../../services/hooks/useVehicles';

interface UpdateModalProps {
  isOpen: boolean;
  onCloseRequest: () => void;
  vehicle?;
}

type IData = {
  name: string;
  brand: string;
  color: string;
  plate: string;
  year: string;
};

export function UpdateModal({
  isOpen,
  onCloseRequest,
  vehicle,
}: UpdateModalProps) {
  const { register, handleSubmit, setValue } = useForm();
  const { refetch } = useVehicles();
  useEffect(() => {
    setValue('name', vehicle?.name);
    setValue('brand', vehicle?.brand);
    setValue('color', vehicle?.color);
    setValue('year', vehicle?.year);
    setValue('plate', vehicle?.plate);
  }, []);

  const handleUpdateVehicle = async (data: IData) => {
    try {
      await api.put(`/vehicles/${vehicle.id}`, data);

      toast.success('Veículo atualizado com sucesso!');

      onCloseRequest();

      refetch();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Container isOpen={isOpen}>
      <Content onSubmit={handleSubmit(handleUpdateVehicle)}>
        <IoArrowBackOutline size={19.5} onClick={onCloseRequest} />
        <Input name="name" label="Nome:" register={register} />
        <Input name="brand" label="Marca:" register={register} />
        <Input name="color" label="Cor:" register={register} />
        <Input name="year" label="Ano:" register={register} />
        <Input name="plate" label="Placa:" register={register} />
        <Button isSave type="submit" />
      </Content>
    </Container>
  );
}
