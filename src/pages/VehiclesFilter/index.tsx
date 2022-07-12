import react from "react";
import styles from "./VehiclesFilter.module.scss";
import { IVehicle, IVehicleFilter } from "../../types/Vehicle";
import { IoChevronBack, IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import * as queryString  from 'query-string';
import { useContext } from "react";
import ConfigContext from "../../contexts/config";
import CurrencyInput from "../../components/CurrencyInput";

const VehiclesFilterPage = () => {
  const { search } = useLocation();
  
  const query = queryString.parse(search)

  const { config: { colors, years, brands } } = useContext(ConfigContext)

  const { register, handleSubmit, control, setValue, getValues } = useForm<IVehicleFilter>({
    defaultValues: query,
    mode: 'all'
  });

  const onClearAll = () => (Object.keys(getValues()) as Array<keyof IVehicleFilter>).forEach(onClearField)

  const onClearField = (field: keyof IVehicleFilter) => setValue(field, '')

  const navigate = useNavigate();

  const onSubmit = async (data: Partial<IVehicle>) => {
    try {
        navigate({ pathname: '/', search: queryString.stringify(data, { skipEmptyString: true }) });
    } catch(err) {
        console.log(err);
    }
  };

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>

      <div className="row d-flex flex-row align-items-center mb-4">
          <div className="col-auto">
            <button type="button" className="btn" aria-label="Back" onClick={() => navigate({ pathname: '/', search })}>
              <IoChevronBack size={24} />
            </button>
          </div>
          <div className="col">
            <h1 className="mb-0">Filter Vehicles</h1>
          </div>
      </div>

      <div className="container">
          <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
              <label htmlFor="inputBrand" className="form-label">Brand</label>
              <div className="input-group">
                <button onClick={() => onClearField('brand')} className="btn btn-outline-secondary" type="button">
                  <IoClose size={24} />
                </button>
                <select className="form-select" {...register("brand")}>
                  <option selected value={''} >Selecionar</option>
                  {brands?.map(brand => (
                    <option value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="inputColor" className="form-label">Color</label>
              <div className="input-group">
                <button onClick={() => onClearField('color')} className="btn btn-outline-secondary" type="button">
                  <IoClose size={24} />
                </button>
                <select className="form-select" {...register("color")}>
                  <option selected value={''} >Selecionar</option>
                  {colors?.map((key) => (
                    <option key={key} value={key}>{key}</option>
                  )) }
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputYear" className="form-label">Year</label>
              <div className="input-group">
                <button onClick={() => onClearField('year')} className="btn btn-outline-secondary" type="button">
                  <IoClose size={24} />
                </button>
                <select className="form-select" {...register("year")}>
                  <option selected  value={''} >Selecionar</option>
                  {years?.map(year => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputMinPrice" className="form-label" >Min Price</label>
              <div className="input-group">
                <button onClick={() => onClearField('minPrice')} className="btn btn-outline-secondary" type="button">
                  <IoClose size={24} />
                </button>
                <Controller
                  name={'minPrice'}
                  control={control}
                  defaultValue={query.minPrice as unknown as number}
                  render={({ field: { ...fieldProps }, fieldState: { error } }) => (
                    <CurrencyInput
                      {...fieldProps as any}
                      defaultValue={query.minPrice}
                      className="form-control" id="inputMinPrice"
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputMaxPrice" className="form-label">Max Price</label>
              <div className="input-group">
                <button onClick={() => onClearField('maxPrice')} className="btn btn-outline-secondary" type="button">
                  <IoClose size={24} />
                </button>
                <Controller
                  name={'maxPrice'}
                  defaultValue={query.minPrice  as unknown as number}
                  control={control}
                  render={({ field: { ...fieldProps }, fieldState: { error } }) => (
                    <CurrencyInput
                      {...fieldProps as any}
                      className="form-control" id="inputMaxPrice"
                      defaultValue={query.minPrice}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="inputIsFavorite" role="switch" {...register("isFavorite", { })} />
                <label className="form-check-label px-2" htmlFor="inputIsFavorite">
                  Show Favorites
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="btn-group mt-4 float-start" role="group" aria-label="Basic outlined example">
                <button type="button" onClick={onClearAll} className="btn btn-secondary">Clear All</button>
              </div>
              <div className="btn-group mt-4 float-end" role="group" aria-label="Basic outlined example">
                <button type="button" onClick={() => navigate({ pathname: '/', search })} className="btn btn-outline-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </form>
        </div>

      </main>
    </div>
  );
};

export default VehiclesFilterPage;
