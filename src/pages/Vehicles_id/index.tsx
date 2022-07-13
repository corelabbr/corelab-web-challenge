import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardDetail from '../../components/CardDetail';
import Title from '../../components/Title';
import { getVehicleById } from '../../lib/api';
import { IVehicle } from '../../types/Vehicle';

export default function Vehicles_id(){

	const [ vehicle, setVehicle ] = useState<IVehicle>();

	const { vehicle_id } = useParams();

	const vId = Number(vehicle_id);
	console.log('AQUI É O VID', vId);

	// useEffect(() => {
	// 	document.body.style.background = 'red';
	//   }, ['red']);

	async function getVehicle() {
		const res = await getVehicleById(vId);
		console.log('OLÁ GENTE', res);
		setVehicle(res);
	}

	useEffect(()=> {
		getVehicle();
	},[vehicle_id]);

	return(
		<>
			<div className='container'>
				<Title title='Detalhes do carro' />
			</div>

			<div className='col-md-8 mt-5 mx-auto'>
				{
					vehicle !== undefined ? (
						<CardDetail
							id={vehicle.id}
							name={vehicle.name}
							brand={vehicle.brand}
							description={vehicle.description}
							price={vehicle.price}
							color={vehicle.color}
							plate={vehicle.plate}
							year={vehicle.year}
							km={vehicle.km}
							btns={ 'like' }
						/>
					) : 'Carregando...'
				}
			</div>

		</>
	);
};