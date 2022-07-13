import { useEffect, useState } from 'react';
import './index.scss';

export default function Filter(props: any){

	const [color, setColor] = useState<any>();

	const filterByColor = props.vehiclesCompleted;


	useEffect(() => {
		if(color !== 'Selecione' && color !== undefined){
			const result = filterByColor.filter((item: any) => item.color === color);
			props.testando(result);
		}
	},[color]);

	function handleSubmit(e: any){
		e.preventDefault();
		e.target.reset();
		props.testando(filterByColor);
	}

	return(
		<div className='w-100 background-dark'>
			<div className='container'>
				<form onSubmit={handleSubmit}>
					<div className='row'>
						<div className='col-md-3'>
							<div className='d-flex flex-column'>
								<label className='light' htmlFor=''>PREÇO</label>
								<div className='row'>
									<div className='col-md-6'>
										<input className='light' type='text' name='' id='' placeholder='min.' disabled />
									</div>
									<div className='col-md-6'>
										<input className='light' type='text' name='' id='' placeholder='max.' disabled />
									</div>
								</div>
							</div>
						</div>

						<div className='col-md-3'>
							<div className='d-flex flex-column'>
								<label className='light' htmlFor=''>COR</label>
								<select className='light' name='' defaultValue={'Selecione'} id='' value={color} onChange={(e) => { setColor(e.target.value );}}>
									<option disabled value='Selecione'>Selecione</option>
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

						<div className='col-md-3'>
							<div className='d-flex flex-column'>
								<label className='light' htmlFor=''>MODELO</label>
								<select className='light' name='color' id='' disabled >
									<option value=''>Renault</option>
									<option value=''>Honda</option>
								</select>
							</div>
						</div>

						<div className='col-md-3'>
							<div className='d-flex flex-column'>
								<label className='light' htmlFor=''>ANO</label>
								<select className='light' name='color' id='' disabled>
									<option value='#'>2013</option>
									<option value='#'>2015</option>
								</select>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='mt-4 col-12 d-flex justify-content-between'>
							<p></p>
							<button className='btn btn-outline-light'>Limpar</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};