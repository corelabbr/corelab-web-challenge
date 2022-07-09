import { useEffect, useState } from "react";
import { getVehicles } from "../lib/api";
import { Button, Card, Search } from "../components";
import { IoOptionsOutline } from 'react-icons/io5'
import { Flex, Icon, Stack } from '@chakra-ui/react'
import { AddVehicles } from "./AddVehicles";


interface IVehicle {
  id: number;
  name: string;
  description: string;
  plate: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
  createdAt: Date;
}


const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");
  const [addCarModal, setAddCarModal] = useState<boolean>(false)

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload);
    };

    fetchVehicles();
  }, []);



  function handleAddCarModal() {
    setAddCarModal(!addCarModal)
  }



  return (
    <>

      {addCarModal ? <AddVehicles handleAddCarModal={handleAddCarModal} /> :


        <Stack spacing={8}>

          <Flex>
            <Search placeholder="Buscar..." value={search} onChange={() => { }} />

            <Icon
              as={IoOptionsOutline}
              w={8}
              h={8}
              color='gray.500'
              marginTop="12"
              marginLeft="4"
              cursor='pointer'
            />
          </Flex>


          <Button text="ADICIONAR" onClick={handleAddCarModal} />



                  {/* 
            <Card title="Sandero Stepway">
              <p>Price: 22000</p>
              <p>Description: Carro usado por 2 anos...</p>
              <p>Year: 2018</p>
            </Card> */}

        </Stack>}

    </>
  )
};

export default VehiclesPage;
