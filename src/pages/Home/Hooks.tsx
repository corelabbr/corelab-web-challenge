import { useContext, useEffect, useState } from 'react';
import { getVehicles } from '../../lib/api';

const handleHome = () => {

	const [ allVehicles, setAllVehicles ] = useState<any>();

	const [ vehicles, setVehicles ] = useState<any>([]);

	const [ currentPage, setCurrentPage ] = useState(1);

	const [ vehiclePerPage ] = useState(6);

	const indexOfLastVehicle = currentPage * vehiclePerPage;

	const indexOfFirstVehicle = indexOfLastVehicle - vehiclePerPage;

	const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

	const items = [];

	// Get Vehicles
	async function getAllVehicles() {
		const res = await getVehicles();
		setVehicles(res);
		setAllVehicles(res);
	}

	useEffect(()=> {
		getAllVehicles();
	},[]);

	for(let i = 1; i <= Math.ceil(vehicles.length / vehiclePerPage); i++){
		items.push(i);
	}

	const pagination = (page: number) => {
		console.log('Num. atual do page: ', page);
		if(page >= 1 && page <= items.length){
			setCurrentPage(page);
		}
	};

	return{
		currentVehicles, items, pagination, currentPage, allVehicles, setVehicles
	};
        
};

export default handleHome;