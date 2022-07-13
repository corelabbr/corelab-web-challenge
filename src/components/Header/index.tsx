import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../Button_primary/index';
import './index.scss';

export default function Header(){

	// const [userPerson, setUserPerson] = useState<IUser>();

	const { signInWithGoogle, user, signOut } = useContext(AuthContext);

	// useEffect(() => {
	// 	setUserPerson(user);
	// },[]);

	async function login(){
		await signInWithGoogle();
	}

	async function logout(){
		await signOut();
	}

	return(
		<div className='container'>
			<div className='row py-4'>
				<div className='col-12 d-flex align-items-center justify-content-between'>
					
					<div className=''>
						<ul className='nav d-flex'>
							<li className='nav-item'><NavLink className='nav-link text-dark' to='/'>Home</NavLink></li>
							
							{
								user?.id ? 
									<>
										<li className='nav-item'><NavLink className='nav-link text-dark' to={`/favorite/${user?.id}`}> Meus Favoritos </NavLink></li> 
										<li className='nav-item'><NavLink className='nav-link text-dark' to={`/adverts/${user?.id}`}> Meus Anúncios</NavLink></li>
										<li className='nav-item'><NavLink className='nav-link text-dark' to={'/vehicle-form'}><i className='bi bi-plus-square me-1'></i> Criar Anúncio </NavLink></li>
										<li onClick={logout} className='nav-item'><p className='nav-link text-dark cursor-pointer'> Logout </p> </li> 
									</>
									: 
									<>
										<li onClick={login} className='nav-item'><p className='nav-link text-dark cursor-pointer'> Meus Favoritos </p></li> 
										<li onClick={login} className='nav-item'><p className='nav-link text-dark cursor-pointer'> Meus Anúncios</p></li>
										<li onClick={login} className='nav-item'><p className='nav-link text-dark cursor-pointer'><i className='bi bi-plus-square me-1'></i> Criar Anúncio </p></li>

									</>
							}
						</ul>
						
					</div>

					
					{user?.id !== undefined ? (
						<>
							<div className='d-flex align-items-center justify-content-center'>
								<p className='pe-3 lead fs-6'> {user?.name}</p>
								<img className='rounded-circle image-size' src={user?.avatar} alt='#' />
							</div>
								
						</>
					) : 
						<div>
							<Button onClick={login}>Login</Button>
						</div>
								
					}
							
				</div>
			</div>
		</div>
	);
};