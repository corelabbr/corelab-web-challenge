import { useContext, useEffect, useState } from 'react';
import Card from '../../components/Card';
import Filter from '../../components/Filter';
import { IVehicle } from '../../types/Vehicle';
import handleHome from './Hooks';

export default function Home(){

	const { currentVehicles, items, pagination, currentPage, allVehicles, setVehicles } = handleHome();

	const filterColor = (filteredVehicle: IVehicle[]) => {
		setVehicles(filteredVehicle);
	};

	
	return(

		<>
			<div className='container'>
				<div className='row position-relative'>
					<i className='bi bi-search position-absolute ms-1 my-2 w-auto'></i>
					<input type='text' name='' id='' className='w-100 dark ps-5' />
				</div>
			</div>

			<Filter testando={filterColor} vehiclesCompleted={allVehicles} />

			<div className='container'>
				<div className='row justify-content-center'>

					{currentVehicles.length !== 0 ? currentVehicles.map((vehicle: IVehicle) => (
								
						<div key={vehicle.id} className='col-md-4'>
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
								user_id={vehicle.user_id}
								btns={ 'like' }
							/>
						</div>
					)) : 'Nenhum veículo foi encontrado...'
					}
						
				</div>

				<div className='col-12 justify-content-center mt-4'>
					<nav className='d-flex align-items-center text-center justify-content-center'>
						<ul className='pagination'>
							<li className='page-item'><a className='page-link text-dark cursor-pointer' onClick={() => pagination(currentPage - 1)}>Voltar</a></li>
							
							{
								items.map(item => (
									<li key={item} className='page-item'><a onClick={() => pagination(item)} className='page-link text-dark cursor-pointer'>{item}</a></li>
								))
							}

							<li className='page-item '><a className='page-link text-dark cursor-pointer' onClick={() => pagination(currentPage + 1)}>Avançar</a></li>
						</ul>
					</nav>
				</div>

			</div>

		</>

	);
}