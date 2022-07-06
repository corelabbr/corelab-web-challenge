import { useEffect, useState } from "react";
import { getVehicles } from "../lib/api";
import { Button, Card, Search } from "../components";
import { IoOptionsOutline } from 'react-icons/io5'
import { BsPlusLg } from 'react-icons/bs'
import { Flex, Icon, Spacer, Stack } from '@chakra-ui/react'

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

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload);
    };

    fetchVehicles();
  }, []);

  console.log({ vehicles });


  return (
    
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




      <Button text="ADICIONAR" onClick={() => { }} />
      

      <Card title="Sandero Stepway">
        <p>Price: 22000</p>
        <p>Description: Carro usado por 2 anos...</p>
        <p>Year: 2018</p>
      </Card>

    </Stack>
    
  );
};

export default VehiclesPage;
