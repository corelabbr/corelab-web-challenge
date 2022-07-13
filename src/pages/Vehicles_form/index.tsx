import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Button from '../../components/Button_primary';
import { AuthContext } from '../../contexts/AuthContext';
import { createVehicle, editVehicle, getVehicleById } from '../../lib/api';
import { IFormVehicle} from '../../types/Vehicle';

export default function VehiclesForm(){

	const vehicleInitial: any = {
		name: '',
		brand: '',
		description: '',
		plate: '',
		year: '',
		color: '',
		price: '',
		km: '',
		user_id: '',
	};

	const { user } = useContext(AuthContext);

	const [ vehicleData, setVehicleData ] = useState<any>(vehicleInitial);

	const { vehicle_id } = useParams();

	function handleInputChange(e: any) {
		
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setVehicleData({
			...vehicleData,
			[name]: value
		});
	}

	const onSubmit = (e: any) => {
		e.preventDefault();

		const vehicle: IFormVehicle = {
			name: vehicleData.name,
			brand: vehicleData.brand,
			description: vehicleData.description,
			plate: vehicleData.plate,
			year: Number(vehicleData.year),
			color: vehicleData.color,
			price: Number(vehicleData.price),
			km: Number(vehicleData.km),
			user_id: user?.id
		};


		if(vehicle_id !== undefined){
			updateVehicle(vehicle);
			swal({
				title: 'Atualizado com sucesso!',
				icon: 'success',
				timer: 3000,
			});

			setVehicleData(vehicleInitial);

		}
		else{
			addVehicle(vehicle);
			swal({
				title: 'Cadastrado com sucesso!',
				icon: 'success',
				timer: 3000,
			});

			setVehicleData(vehicleInitial);
		}
	};


	async function addVehicle(vehicle: IFormVehicle){
		const result = await createVehicle(vehicle);
		return result;
	}


	async function updateVehicle(vehicle: IFormVehicle){
		const res = await editVehicle(vehicle, Number(vehicle_id));
		return res;
	}

	async function getVehicle() {
		const res = await getVehicleById(Number(vehicle_id));
		setVehicleData(res);
	}

	useEffect(()=> {
		if(vehicle_id !== undefined){
			getVehicle();
		}
	},[vehicle_id]);


	return(
		<>
			<div className='container'>
				<form onSubmit={onSubmit}>
					<div className='row'>					
						<div className='col-md-6 my-3'>
							<div className='d-flex flex-column'>
								<label className='dark' htmlFor=''>NOME</label>
								<input className='dark' type='text' value={vehicleData?.name} name='name' id='' onChange={handleInputChange} />
							</div>
						</div>

						<div className='col-md-6 my-3'>
							<div className='d-flex flex-column'>
								<label className='dark' htmlFor=''>MODELO</label>
								<input className='dark' type='text' value={vehicleData?.brand} name='brand' id='' onChange={handleInputChange} />
							</div>
						</div>

						<div className='col-md-8 my-3'>
							<div className='d-flex flex-column'>
								<label className='dark' htmlFor=''>DESCRIÇÃO</label>
								<input className='dark' type='text' value={vehicleData?.description} name='description' id='' onChange={handleInputChange} />
							</div>
						</div>

						<div className='col-md-4 my-3'>
							<div className='d-flex flex-column'>
								<label className='dark' htmlFor=''>PLACA</label>
								<input className='dark' type='text' value={vehicleData?.plate} name='plate' id='' onChange={handleInputChange} />
							</div>
						</div>

						<div className='col-md-3 my-3'>
							<div className='d-flex flex-column'>
								<label className='dark' htmlFor=''>PREÇO</label>
								<input className='dark' type='number' value={vehicleData?.price} name='price' id='' onChange={handleInputChange} />
							</div>
						</div>

						<div className='col-md-3 my-3'>
							<div className='d-flex flex-column'>
								<label className='dark' htmlFor=''>COR</label>
								<select name='color' id='' value={vehicleData?.color} onChange={handleInputChange} >
									<option value='Preto'>Preto</option>
									<option value='Branco'>Branco</option>
									<option value='Prata'>Prata</option>
									<option value='Vermelho'>Vermelho</option>
									<option value='Azul'>Azul</option>
									<option value='Amarelo'>Amarelo</option>
									<option value='Verde'>Verde</option>
									<option value='Marrom'>Marrom</option>
								</select>
							</div>
						</div>

						<div className='col-md-3 my-3'>
							<div className='d-flex flex-column'>
								<label className='dark' htmlFor=''>ANO</label>
								<input className='dark' type='number' name='year' id='' value={vehicleData?.year} onChange={handleInputChange} />
							</div>
						</div>

						<div className='col-md-3 my-3'>
							<div className='d-flex flex-column'>
								<label className='dark' htmlFor=''>KM RODADOS</label>
								<input className='dark' type='number' name='km' id='' value={vehicleData?.km} onChange={handleInputChange} />
							</div>
						</div>

						<div className='col-md-2 w-100 d-flex justify-content-end text-end mt-4'>
							{
								vehicle_id !== undefined ? (
									<Button type='submit'> Editar </Button>
								
								): <Button type='submit'> Criar </Button>
							}
						</div>
					</div>
				</form>
			</div>
		</>
	);
};