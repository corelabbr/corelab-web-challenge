import { useContext,useState } from "react";
import { Button, Card, Search } from "../../components";
import "./style.css";
import NavBar from "../../components/NavBar";
import Modal from "../../components/ModalEditAndAddVehicle";
import { VehicleContext } from "../../contexts/vehicleContext";
import Filter from "../../components/Filter";
const VehiclesPage = () => {
  const {setOpenModal,openModal,vehicles} = useContext(VehicleContext);
  const [title, setTitle] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  return (
    <main>
        <NavBar />
        <Filter/>
        <Button
          text='Add new vehicle'
          onClick={() => {
            setTitle("Add new vehicle");
            setOpenModal(true)
          }}
        />
        <div className='vehicles-cards'>
          {vehicles.map((vehicle) => (
            <Card
              vehicle={vehicle}
              key={vehicle.id}
              title={vehicle.name}
              color={vehicle.color}
              setTitle={setTitle}
            >
              <p>Price: {vehicle.price}</p>
              <p>Description: {vehicle.description}</p>
              <p>Year: {vehicle.year}</p>
            </Card>
          ))}
        </div>
        {openModal && <Modal title={title} />}
    </main>
  );
};

export default VehiclesPage;
