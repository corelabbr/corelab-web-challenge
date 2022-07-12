import LogoImg from '../assets/logo.png';
import { BiFilter } from 'react-icons/bi';
import { CreateVehicleModal } from './modals/CreateVehicleModal';

export const Home = () => {
  return (
    <div className="home">
      <div className="container mx-3 py-3">
        <div className="title-container">
          <h2>Welcome to DevMotors</h2>
          <p>Browse the best motors for your dev carreer!</p>
          <div className="input-container">
            <input type="text" placeholder="Search car..." />
            <div className="icon">
              <BiFilter size={'1.5rem'} />
            </div>
          </div>
          <CreateVehicleModal />
        </div>
        <div className="logo-img">
          <img src={LogoImg} alt="Car logo" />
        </div>
      </div>
    </div>
  );
};
