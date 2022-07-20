import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { IVehicleFormData } from "../../shared/types";
import { yearOptions, colorOptions, brandOptions } from "../../shared/constants";

import { SubmitButton, FormInput, FormSelect } from "..";
import { Form } from "./styles";

interface VehicleFormProps {
	initialValues?: IVehicleFormData;
	onSubmit: (data: IVehicleFormData) => void;
}

const schema = yup.object().shape({
	name: yup.string().required(),
	brand: yup.string().required(),
	description: yup.string().required(),
	color: yup.string().required(),
	plate: yup.string().required(),
	year: yup.number().required(),
	price: yup.number().required(),
});

const defaultValues: IVehicleFormData = {
	name: "",
	brand: brandOptions[0],
	description: "",
	color: colorOptions[0].color,
	plate: "",
	year: yearOptions[0],
	price: 0,
};

const VehicleForm = ({ onSubmit, initialValues = defaultValues }: VehicleFormProps) => {
	const { register, handleSubmit } = useForm<IVehicleFormData>({
		defaultValues: initialValues,
		resolver: yupResolver(schema),
	});

	function onSubmitHandle(data: IVehicleFormData) {
		if (initialValues?.id) {
			data.id = initialValues.id;
		}

		onSubmit(data);
	}

	return (
		<Form action="submit" onSubmit={handleSubmit(onSubmitHandle)}>
			<label htmlFor="Name">Nome:</label>
			<FormInput type="text" required {...register("name")} />

			<label htmlFor="brand">Marca:</label>
			<FormSelect required {...register("brand")}>
				{brandOptions.map((brand) => (
					<option key={brand} value={brand}>
						{brand}
					</option>
				))}
			</FormSelect>

			<label htmlFor="description">Descrição:</label>
			<FormInput type="text" required {...register("description")} />

			<label htmlFor="color">Cor:</label>
			<FormSelect {...register("color")}>
				{colorOptions.map((colorOption) => (
					<option key={colorOption.name} value={colorOption.name}>
						{colorOption.name}
					</option>
				))}
			</FormSelect>

			<label htmlFor="year">Ano:</label>
			<FormSelect required {...register("year")}>
				{yearOptions.map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</FormSelect>

			<label htmlFor="plate">Placa:</label>
			<FormInput
				type="text"
				required
				{...register("plate")}
				pattern="[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}"
			/>

			<label htmlFor="price">Preço:</label>
			<FormInput type="number" required {...register("price")} />

			<SubmitButton type="submit">Salvar</SubmitButton>
		</Form>
	);
};

export default VehicleForm;
