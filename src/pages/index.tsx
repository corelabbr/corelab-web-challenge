import {
  Container,
  Content,
  Title,
  Header,
  Cards,
  ColumContainer,
} from '../../shared/home.styles';
import { Button } from '../components/Button';

import { useEffect, useState } from 'react';
import { Modal } from '../components/Modal';
import { Card } from '../components/Card';
import Skeleton from 'react-loading-skeleton';
import { Search } from '../components/Search';
import { useVehicles } from '../services/hooks/useVehicles';
import { FilterModal } from '../components/FilterModal';
import { useFilter } from '../services/hooks/useFilter';

type IVehicles = {
  name: string;
  color: string;
  brand: string;
  year: string;
  price: number;
  id: string;
  description: string;
  favorite: boolean;
};

type IFavorites = IVehicles;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<IVehicles[]>();
  const [vehicles, setVehicles] = useState<IVehicles[]>();
  const [favorites, setFavorites] = useState<IFavorites[]>();
  const [search, setSearch] = useState<string>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data, error, isLoading, isFetching } = useVehicles();

  const SKELETON_REPEATS = 10;

  useEffect(() => {
    const handleVehicles = async () => {
      try {
        const favorites = data.vehicles.filter(res => res.favorite === true);

        setFavorites(favorites);

        setVehicles(data.vehicles);

        setResults(data.vehicles);
      } catch (err) {
        console.log(err);
      }
    };
    handleVehicles();
  }, [data]);

  const handleSearch = e => {
    const search = e.target.value;

    if (search.length <= 0) {
      setResults(vehicles);
    } else {
      const filteredVehicle = [];

      data?.vehicles.forEach(vehicle => {
        if (
          vehicle.brand?.includes(search) ||
          vehicle.color?.includes(search) ||
          vehicle.description?.includes(search) ||
          vehicle.name?.includes(search) ||
          vehicle.price?.toString().includes(search)
        )
          filteredVehicle.push(vehicle);
      });

      setResults(filteredVehicle);
    }
  };

  return (
    <>
      <Container>
        <Content>
          <Header>
            <Search
              onOpenRequest={() => setIsFilterOpen(true)}
              onSearch={handleSearch}
              placeholder="Buscar"
              value={search}
            />
            <Button onClick={() => setIsOpen(true)} />
          </Header>
          {favorites?.length > 0 && (
            <ColumContainer>
              <Title>Favoritos</Title>
              <Cards>
                {favorites?.map(favorite => {
                  return <Card key={favorite.id} vehicle={favorite} />;
                })}
              </Cards>
            </ColumContainer>
          )}
          {error && <h1>Falha ao buscar os veículos...</h1>}
          {isLoading ||
            (isFetching && (
              <Cards>
                {[...Array(SKELETON_REPEATS)].map(index => (
                  <Cards key={index}>
                    <Skeleton width={258} height={201} />
                    <Skeleton width={258} height={201} />
                  </Cards>
                ))}
              </Cards>
            ))}
          <ColumContainer>
            <Title>{vehicles?.length > 0 && 'Meus Anúncios'}</Title>
            <Cards>
              {results?.map(vehicle => {
                return <Card key={vehicle.id} vehicle={vehicle} />;
              })}
            </Cards>
          </ColumContainer>
        </Content>
      </Container>
      <Modal isOpen={isOpen} onCloseRequest={() => setIsOpen(false)} />
      <FilterModal
        isOpen={isFilterOpen}
        onCloseRequest={() => setIsOpen(false)}
      />
    </>
  );
}
