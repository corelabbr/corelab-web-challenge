import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { AuthContextProvider } from './contexts/AuthContext';
import Home from './pages/Home/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.scss';
import Favorites from './pages/Favorites';
import VehiclesForm from './pages/Vehicles_form';
import Adverts from './pages/Adverts';
import Vehicles_id from './pages/Vehicles_id';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<AuthContextProvider >
			<Header />
			<Routes>
				<Route path='/' element={<Home/>} />

				<Route path='/vehicle-form' element={<VehiclesForm />}> 
					<Route path='/vehicle-form/:vehicle_id' element={<VehiclesForm />} />
				</Route>

				<Route path='/favorite/:user_id' element={<Favorites />} />
				<Route path='/details/:vehicle_id' element={<Vehicles_id/>} />
				<Route path='/adverts/:user_id' element={<Adverts />} />
			</Routes>
		</AuthContextProvider>
	</BrowserRouter>
);