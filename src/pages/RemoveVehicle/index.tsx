import react, { useContext, useEffect, useState } from "react";
import api from "../../lib/api";
import styles from "./RemoveVehicle.module.scss";
import { IoChevronBack, IoEllipsisHorizontal, IoHeart, IoHeartOutline } from "react-icons/io5";

import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components";
import Car from "../../components/Car";
import IconButton from "../../components/IconButton";
import { IVehicle } from "../../types/Vehicle";
import ConfigContext from "../../contexts/config";

const RemoveVehiclePage = () => {
  const [vehicle, setVehicle] = useState<IVehicle>()
  const navigate = useNavigate();

  const { id } = useParams();
  
  const { getVehicleColor } = useContext(ConfigContext)

  useEffect(() => {
    const fetchVehicle = async () => {
      const { data } = await api.get<IVehicle>(`/vehicles/${id}`);
      setVehicle(data);
    };

    fetchVehicle();
  }, []);

  const onRemove = async () => {
    try {
        await api.delete(`/vehicles/${id}`)
        navigate('/');
    } catch(err) {
        console.log(err);
    }
  };

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>

      <div className="row d-flex flex-row align-items-center mb-4">
          <div className="col-auto">
            <button type="button" className="btn" aria-label="Back" onClick={() => navigate({ pathname: '/' })}>
              <IoChevronBack size={24} />
            </button>
          </div>
          <div className="col">
            <h1 className="mb-0">Remove Vehicle</h1>
          </div>
        </div>

        <div className="container text-center">
          <div className="row d-flex justify-content-center">

            <h2 className="text-body">you want to permanently delete this vehicle?</h2>

            <div className="row mt-5">
                  <div className="col-12 col-md-4 m-auto">
                    <Card style={{ marginBottom: 50  }} title={vehicle?.name}
                      headerComponent={
                        <div style={{ 
                          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                          position: 'absolute', right: 2, top: 0, 
                        }}>
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
                      </div>

                        <div className={'col-7 mt-4'}>
                          <Car color={getVehicleColor(vehicle?.color)}/>
                        </div>
                    </div>

                    </Card>
                  </div>
            </div>

              <div className="col-12">
                <div className="btn-group mt-4 centered" role="group" aria-label="Basic outlined example">
                  <button data-testid="cancel-btn" type="button" className="btn btn-outline-secondary" onClick={() => navigate({ pathname: '/' })}>Cancel</button>
                  <button data-testid="remove-btn" type="button" className="btn btn-danger" onClick={() => onRemove()} >Remove</button>
                </div>
              </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default RemoveVehiclePage;
