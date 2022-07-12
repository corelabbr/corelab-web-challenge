import { useEffect, useState, useContext } from "react";
import api from "../../lib/api";
import { Button, Card, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";
import { IoEllipsisHorizontal, IoFilter, IoHeart, IoClose, IoCloseCircle, IoAdd, IoHeartOutline, IoOptions, IoSettings } from "react-icons/io5";
import { Link, useLocation, useNavigate, useSearchParams  } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

import * as queryString  from 'query-string';

import Car from "../../components/Car";
import ConfigContext from "../../contexts/config";
import IconButton from "../../components/IconButton";

import { Offcanvas } from 'react-bootstrap'

//search: "?" + new URLSearchParams({clientId: clientId}).toString()

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<string | number>('');

  const handleClose = () => {
    setShow(false)
    setSelected('')
  };
  const handleShow = (id: string | number) => {
    setShow(true)
    setSelected(id)
  };
  
  
  const { search: q } = useLocation();

  const query = queryString.parse(q);
  
  const [search, setSearch] = useState<string>(query?.search as string || '');

  const [_, setSearchParams] = useSearchParams();

  const debouncedSearch = useDebounce<string>(search, 500)

  const { getVehicleColor } = useContext(ConfigContext)

  const navigate = useNavigate();

  function setQueryValue (key: string, value: string) {
    setSearchParams({ ...query, [key]: value } as any)
    delete query[key]
    navigate({ pathname: '/', search: queryString.stringify(query) }, { replace: true })
    fetchVehicles()
  }

  const fetchVehicles = async () => {
    if (debouncedSearch) {
      delete query.search
      setSearchParams({ search: debouncedSearch, ...query })
    }
    
    const { data } = await api.get<IVehicle[]>('/vehicles', { params: { ...query, search: debouncedSearch } });
    setVehicles(data);
  };

  /*This is effect for fetch vehicles When change search input debouced*/
  useEffect(() => { fetchVehicles() }, [debouncedSearch]);

  const onFavorite = async (id: number | string, isFavorite: boolean) => {
    try {
        await api.put(`/vehicles/${id}`, { isFavorite })
        setVehicles(vehicles => vehicles.map(vehicle => vehicle.id === id ? ({ ...vehicle, isFavorite }) : vehicle ))
    } catch(err) {
        console.log(err);
    }
  };

  return (
    <>
    <div className={styles.Vehicles}>
      <main className={styles.main}>

        <div className="mt-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Search placeholder="search" 
            value={search} onChangeText={text => setSearch(text)} 
            onSearch={() => {}}
            toolsComponent={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button data-testid="filter-vehicles" onClick={() => navigate({ pathname: '/filter', search: q })} type="button" aria-label="Search" role="button" >
                    <IoFilter />
                </button>
              </div>
            }
          />
        </div>

          <div className="col-12 mt-2">
              {Object.keys(query).filter(key => query[key] && key!=='search').map(key => (
                <button className="btn" style={{ padding:0, marginRight: 10 }} onClick={() => setQueryValue(key, '')}>
                  <span className="badge rounded-pill bg-light text-body p-2" >
                    <span style={{ opacity: 0 }}>oi</span>
                    {key}: {query[key]}
                    <IoCloseCircle style={{ marginLeft: 10 }} />
                  </span>
                </button>
              ))}
        </div>

        <div className="row mt-2">
          <div className="col-12">

              <div className="d-flex flex-row justify-content-between">
                  <div className="col">
                    <h2>Vehicles</h2>
                    <p>You have <span className="text-primary"><strong>{vehicles?.length}</strong></span> Vehicles in show</p>
                  </div>

                  <div>
                    <button data-testid="add-new-vehicle" type="button" className="btn btn-link text-decoration-none bg-light rounded-5 float-end" onClick={() => navigate('/add-vehicle')} >
                        <IoAdd style={{ margin: 5 }}/>
                        <span  style={{ margin:5 }}>add new vehicle</span>
                    </button>
                  </div>

              </div>

          </div>
        </div>

        <div className="row">
            {vehicles?.map?.((vehicle: IVehicle) => (
              <div className="col-12 col-md-4">
                <Card style={{ marginBottom: 50  }} title={vehicle?.name}
                  headerComponent={
                    <div style={{ 
                      display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                      position: 'absolute', right: 2, top: 0, 
                    }}>

                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <button className="btn  bg-transparent" onClick={() => handleShow(vehicle.id)} type="button"  >
                            <IoEllipsisHorizontal size={24} />
                        </button>

                      </div>
                    </div>
                }
                >
                <div className="row d-flex flex-row justify-content-between pb-3">
                  <div className="col-5">
                    <p className="d-inline-block text-truncate mt-2 text-body" style={{ maxWidth: 150 }}>{vehicle?.description}</p>

                    <p className="text-truncate fw-semibold fs-5 mt-2" style={{ maxWidth: 150 }} >
                      <span className="text-success fs-5 fw-semibold">R${vehicle?.price}</span>
                    </p>

                    <div className="position-absolute" style={{ bottom: -10, left: -10 }}>
                      <p className="badge rounded-pill bg-light text-body px-3" style={{ fontSize: 12, fontWeight: '500' }}>{vehicle?.year}</p>
                    </div>

                    <IconButton style={{ position: 'absolute', right: -15, bottom: -20, borderWidth: 0 }} onClick={() => onFavorite(vehicle.id, !vehicle.isFavorite)}>
                      {vehicle.isFavorite ? <IoHeart size={24} color={'red'} />
                      : <IoHeartOutline size={24} color={'black'} />}
                    </IconButton>
                  </div>

                    <div className={'col-7 mt-4'}>
                      <Car color={getVehicleColor(vehicle.color)}/>
                    </div>
                </div>

                </Card>
              </div>
            ))}
        </div>

      </main>
    </div>

    <Offcanvas show={show} onHide={handleClose} placement='bottom'  >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Vehicle Options</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-grid gap-3">
              <button onClick={() => navigate(`/edit-vehicle/${selected}`)} className="btn btn-primary" type="button">Edit</button>
              <button onClick={() => navigate(`/remove-vehicle/${selected}`)} className="btn btn-danger" type="button">Remove</button>
            </div>
            <div className="d-grid mt-3">
              <button className="btn btn-outline-secondary" type="button" onClick={handleClose}>Cancel</button>
            </div>
          </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default VehiclesPage;
