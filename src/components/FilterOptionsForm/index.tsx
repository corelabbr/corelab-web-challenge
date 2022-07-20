import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { SubmitButton, FormInput, FormSelect } from "..";
import { useVehicles } from "../../providers/VehiclesProvider";
import { IFilterOptions } from "../../shared/types";

import { colorOptions, brandOptions, yearOptions } from "../../shared/constants";

import { Form } from "./styles";

const schema = yup.object().shape({
	brand: yup.string(),
	color: yup.string(),
	year: yup.lazy((value) => (value === "" ? yup.string() : yup.number())),
	minPrice: yup.lazy((value) => (value === "" ? yup.string() : yup.number())),
	maxPrice: yup.lazy((value) => (value === "" ? yup.string() : yup.number())),
});

const FilterOptionsForm = () => {
	const { filterOptions, handleUpdateFilterOptions } = useVehicles();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFilterOptions>({
		defaultValues: filterOptions,
		resolver: yupResolver(schema),
	});

	function onSubmitHandle(filterOptions: IFilterOptions) {
		if (filterOptions.minPrice) {
			filterOptions.minPrice = Number(filterOptions.minPrice);
		}

		if (filterOptions.maxPrice) {
			filterOptions.maxPrice = Number(filterOptions.maxPrice);
		}

		handleUpdateFilterOptions(filterOptions);
	}

	return (
		<Form action="submit" onSubmit={handleSubmit(onSubmitHandle)}>
			<label htmlFor="brand">Marca:</label>
			<FormSelect {...register("brand")}>
				<option value=""></option>
				{brandOptions.map((brand) => (
					<option key={brand} value={brand}>
						{brand}
					</option>
				))}
			</FormSelect>

			<label htmlFor="color">Cor:</label>
			<FormSelect {...register("color")}>
				<option value=""></option>
				{colorOptions.map((colorOption) => (
					<option key={colorOption.name} value={colorOption.name}>
						{colorOption.name}
					</option>
				))}
			</FormSelect>

			<label htmlFor="year">Ano:</label>
			<FormSelect {...register("year")}>
				<option value=""></option>
				{yearOptions.map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</FormSelect>
			<p>{errors.year?.message}</p>

			<label htmlFor="minPrice">Preço Minimo</label>
			<FormInput {...register("minPrice")} type="number" />
			<p>{errors.minPrice?.message}</p>

			<label htmlFor="maxPrice">Preço Máximo</label>
			<FormInput {...register("maxPrice")} type="number" />
			<p>{errors.maxPrice?.message}</p>

			<SubmitButton type="submit">Salvar</SubmitButton>
		</Form>
	);
};

export default FilterOptionsForm;
