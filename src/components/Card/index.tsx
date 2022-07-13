import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../contexts/AuthContext';
import { createFavorite, deleteVehicle } from '../../lib/api';
import { IVehicle } from '../../types/Vehicle';
import Button from '../Button_primary';
import BtnRounded from '../Button_rounded';
import setColor from './Hook';
import './index.scss';

export default function Card(card: IVehicle){

	const [ bgColor, setBgColor ] = useState<string>();

	const { user, signInWithGoogle} = useContext(AuthContext);

	useEffect(() => {
		const result = setColor(card.color);
		setBgColor(result);
	},[card.color]);

	async function handleFavoriteVehicle(vehicle:number){

		if(user?.id !== undefined){
			createFavorite(user?.id, vehicle);
			swal({
				title: 'Favoritado com sucesso!',
				icon: 'success',
				timer: 3000,
			});
		}else{

			await signInWithGoogle();
			if(user?.id !== undefined){
				createFavorite(user?.id, vehicle);
				swal({
					title: 'Favoritado com sucesso!',
					icon: 'success',
					timer: 3000,
				});
			}
		}
	}

	function destroyVehicle(vehicle:number){
		deleteVehicle(vehicle);
		swal({
			title: 'Deletado com sucesso!',
			icon: 'success',
			timer: 3000,
		});

		setTimeout(()=> {
			window.location.reload();
		},1400);

	}

	const navigate = useNavigate();

	return(
		<div className='container-shadow-rounded my-3'>
			<div className='bg-color' style={{background: `linear-gradient(30deg, rgba(${bgColor}),  rgba(${bgColor}))`}}>
				<p>{card.brand}</p>

				<div className='float-title'>
					<p>{card.name}</p>
				</div>

			</div>

			<div className='container mt-5 d-flex flex-column align-items-center position-relative'>
				
				<div>
					<p>{card.description}</p>
				</div>

				<Button onClick={() => navigate(`/details/${card.id}`)}>VER MAIS</Button>
				
				<div className='row w-100 mb-3 details'>
					<div className='col-6 my-2'>
						<p className='font-weight-bold'>VALOR</p>
					</div>

					<div className='col-6 text-end my-2'>
						<p className='font-weight-bold'>R$ {card.price}</p>
					</div>

					<div className='col-6 my-2'>
						<p className='font-weight-bold'>COR</p>
					</div>

					<div className='col-6 text-end my-2'>
						<p className='font-weight-bold'>{card.color}</p>
					</div>
				</div>

				<div className='row w-100 sizes'>
					<div className='col-4'>
						<p className='font-weight-bold'>{card.plate}</p>
						<span>PLACA</span>
					</div>

					<div className='col-4 text-center'>
						<p className='font-weight-bold'>{card.year}</p>
						<span>ANO</span>
					</div>

					<div className='col-4 text-end'>
						<p className='font-weight-bold'>{card.km}</p>
						<span>KM</span>
					</div>
				</div>

				<div className='float-btn'>
					{
						card.btns === 'like' ?
							<BtnRounded onClick={() => handleFavoriteVehicle(card.id)}><i className='bi bi-heart fs-4'></i></BtnRounded>
							: <>
								<BtnRounded onClick={() => navigate(`/vehicle-form/${card.id}`)} ><i className='bi bi-pencil'></i></BtnRounded>
								<BtnRounded onClick={() => destroyVehicle(card.id)} ><i className='bi bi-trash'></i></BtnRounded>
							</>
					}
				</div>

			</div>
		</div>
	);
};