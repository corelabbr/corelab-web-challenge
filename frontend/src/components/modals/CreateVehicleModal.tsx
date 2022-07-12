import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { MyDropzone } from '../utils/Dropzone';
import { gql, useMutation } from '@apollo/client';
import { Vehicle } from '../../graphql/models/Vehicle';

Modal.setAppElement('#root');

const CREATE_VEHICLE = gql`
  mutation (
    $model: String!
    $brand: String!
    $color: String!
    $price: Float!
    $category: String!
    $year: Int!
    $image: Upload!
    $rating: Float!
  ) {
    createVehicle(
      model: $model
      brand: $brand
      color: $color
      price: $price
      category: $category
      year: $year
      image: $image
      rating: $rating
    ) {
      id
      model
      brand
    }
  }
`;

export function CreateVehicleModal() {
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('blue');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('bus');
  const [year, setYear] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [createfunction] = useMutation<Vehicle>(CREATE_VEHICLE);

  const handleCreateVehicle = async (e: FormEvent) => {
    e.preventDefault();

    await createfunction({
      variables: {
        model,
        brand,
        color,
        price,
        category,
        year,
        image,
        rating: 0,
      },
    });

    onRequestClose();
  };

  const onRequestClose = () => {
    clearForm();
    setIsOpen(false);
  };

  const clearForm = () => {
    setModel('');
    setBrand('');
    setColor('red');
    setPrice(0);
    setCategory('car');
    setYear(0);
    setImage(null);
  };

  const changeImage = (image: File) => {
    setImage(image);
  };

  return (
    <div>
      <button className="open-modal-button" onClick={() => setIsOpen(true)}>
        create vehicle
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
        contentLabel="Example Modal"
        preventScroll={false}
      >
        <AiOutlineClose
          style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
          onClick={onRequestClose}
        />
        <div className="create-form-container">
          <div className="content">
            <form onSubmit={handleCreateVehicle}>
              <h2>Create Vehicle</h2>
              <div className="form-item">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  title="model"
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                />
              </div>

              <div className="form-item">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  title="brand"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                />
              </div>
              <div className="form-item">
                <label htmlFor="color">Color</label>
                <select
                  name="colors"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
              </div>
              <div className="form-item">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  prefix="R$"
                  onChange={(event) => setPrice(Number(event.target.value))}
                />
              </div>
              <div className="form-item">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  onChange={(event) => setYear(Number(event.target.value))}
                />
              </div>
              <div className="form-item">
                <label htmlFor="category">Category</label>
                <select
                  name="categories"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="car">Car</option>
                  <option value="motorbike">Motorbike</option>
                  <option value="bus">Bus</option>
                  <option value="truck">Truck</option>
                  <option value="plane">Plane</option>
                  <option value="ship">Ship</option>
                  <option value="rocket">Rocket</option>
                  <option value="wagon">Wagon</option>
                </select>
              </div>
              <div className="form-item">
                <MyDropzone changeUploadedImage={changeImage} />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
