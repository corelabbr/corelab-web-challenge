import { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/AuthContext';
import { getFavoriteById, getVehicles } from '../../lib/api';
import { IVehicle } from '../../types/Vehicle';

export default function Favorites(){

	const [ vehicles, setVehicles ] = useState<IVehicle[]>();

	const { user_id } = useParams();

	// async function login(){
	// 	await signInWithGoogle();
	// }

	// async function logout(){
	// 	await signOut();
	// }

	// Get Vehicles
	async function getAllVehicles() {
		console.log('USER ID : ',user_id);
		const res = await getFavoriteById(user_id);
		console.log('RES : ',res);
		setVehicles(res);
	}

	useEffect(() => {
		getAllVehicles();
	},[user_id]);

	return(
		<>
			<div className='container'>
				<Title title='Meus Favoritos' />
			</div>

			<div className='mt-5'>

				<Carousel variant='dark'>
					{vehicles?.length !== 0 ? vehicles?.map((vehicle: any) => (

						<Carousel.Item key={vehicle.id}>
						
							<div  className='col-md-4 m-auto pb-5 px-4'>
								<Card 
									id={vehicle.vehicle.id}
									name={vehicle.vehicle.name}
									brand={vehicle.vehicle.brand}
									description={vehicle.vehicle.description}
									price={vehicle.vehicle.price}
									color={vehicle.vehicle.color}
									plate={vehicle.vehicle.plate}
									year={vehicle.vehicle.year}
									km={vehicle.vehicle.km}
									btns={ 'like' }
								/>
							</div>

						</Carousel.Item>
					)) : 'Nenhum veículo foi encontrado...'
					}
					
				</Carousel>

			</div>
		</>
	);
};