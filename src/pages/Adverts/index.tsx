import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import Title from '../../components/Title';
import { getVehicleByUserId } from '../../lib/api';
import { IVehicle } from '../../types/Vehicle';

export default function Adverts(){

	const [ vehicles, setVehicles ] = useState<IVehicle[]>();
	
	const { user_id } = useParams();
	
	// Get Vehicles
	async function getAllVehicles() {
		console.log('USER ID : ',user_id);
		const res = await getVehicleByUserId(user_id);
		console.log('RES : ',res);
		setVehicles(res);
	}
	
	useEffect(() => {
		getAllVehicles();
	},[user_id]);
	


	return(
		<>
			<div className='container'>
				<Title title='Meus Anúncios' />
			</div>

			<div className='mt-5 w-100'>
				<Carousel variant='dark'>
					{vehicles?.length !== 0 ? vehicles?.map((vehicle: IVehicle) => (

						<Carousel.Item key={vehicle.id}>
						
							
							<div  className='col-md-4 m-auto pb-5 px-4'>
								<Card 
									id={vehicle.id}
									name={vehicle.name}
									brand={vehicle.brand}
									description={vehicle.description}
									price={vehicle.price}
									color={vehicle.color}
									plate={vehicle.plate}
									year={vehicle.year}
									km={vehicle.km}
									btns={ '' }
								/>
							</div>

						</Carousel.Item>
					)) : ''
					}
					
					
				</Carousel>
			</div>
		</>
	);
};