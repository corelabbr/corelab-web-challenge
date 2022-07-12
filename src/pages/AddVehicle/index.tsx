import react, { useContext } from "react";
import api from "../../lib/api";
import styles from "./AddVehicle.module.scss";
import { IVehicle } from "../../types/Vehicle";
import { IoChevronBack } from "react-icons/io5";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Form, InputGroup } from 'react-bootstrap'

import ConfigContext from "../../contexts/config";
import CurrencyInput from "../../components/CurrencyInput";


const AddVehiclePage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IVehicle>();

  const navigate = useNavigate();

  const { config: { colors, years, brands } } = useContext(ConfigContext)

  const onSubmit = async (data: Partial<IVehicle>) => {
    try {
        await api.post('/vehicles', {...data, isFavorite: false})
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
            <h1 className="mb-0">Add Vehicle</h1>
          </div>
        </div>

        <div className="container">

          <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">name</label>
                <InputGroup hasValidation>
                    <Form.Control id="inputName" required isInvalid={!!errors?.name}  {...register("name", { required: true })} />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                </InputGroup>
              </div>

              <div className="col-md-6">
                <label className="form-label" htmlFor="inputBrand">brand</label>
                <InputGroup hasValidation>
                    <Form.Control id="inputBrand" list="brand-suggestions" required isInvalid={!!errors?.brand}  {...register("brand", { required: true })} />
                    <datalist id="brand-suggestions">
                        {brands?.map((key) => (
                            <option key={key} value={key}>{key}</option>
                        )) }
                    </datalist>
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                </InputGroup>
              </div>

              <div className="col-12">
                <label htmlFor="inputDescription" className="form-label">description</label>
                <textarea className="form-control" id="inputDescription" rows={3} {...register("description", { })}/>
              </div>

              <div className="col-6">
                <label className="form-label" htmlFor="inputColor" >color</label>
                <InputGroup hasValidation>
                    <Form.Control id="inputColor" list="color-suggestions" required isInvalid={!!errors?.color}  {...register("color", { required: true })} />
                    <datalist id="color-suggestions">
                        {colors?.map((key) => (
                            <option key={key} value={key}>{key}</option>
                        )) }
                    </datalist>
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                </InputGroup>
              </div>

              <div className="col-6">
                <label className="form-label" htmlFor="inputYear">year</label>

                <InputGroup hasValidation>
                    <Form.Control id="inputYear" list="year-suggestions" required isInvalid={!!errors?.year}  {...register("year", { required: true })} />
                    <datalist id="year-suggestions">
                        {years?.map((key) => (
                            <option key={key} value={key}>{key}</option>
                        )) }
                    </datalist>
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                </InputGroup>
              </div>

              <div className="col-md-6">
                <label className="form-label"  htmlFor="inputPlate">plate</label>
                  <InputGroup hasValidation>
                    <Form.Control type="text" id="inputPlate" required isInvalid={!!errors?.plate}  {...register("plate", { required: true })} />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </InputGroup>
              </div>

              <div className="col-md-6">
                <label className="form-label"  htmlFor="inputPrice">price</label>
                <Controller
                  name={'price'}
                  control={control}
                  render={({ field: { ...fieldProps }, fieldState: { error } }) => (
                    <CurrencyInput
                      {...fieldProps as any}
                      id="inputPrice" className="form-control"
                    />
                  )}
                />
                {errors.price && <span>This field is required</span>}
              </div>

              <div className="col-12 mt-4">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="inputIsFavorite" {...register("isFavorite", { })} />
                  <label className="form-check-label px-2" htmlFor="inputIsFavorite">
                    favorite
                  </label>
                </div>
              </div>
              
              <div className="col-12">
                <div className="btn-group mt-4 float-end" role="group" aria-label="Basic outlined example">
                  <button type="submit" className="btn btn-primary">Confirm</button>
                </div>
              </div>
          </form>
        </div>

      </main>
    </div>
  );
};

export default AddVehiclePage;
