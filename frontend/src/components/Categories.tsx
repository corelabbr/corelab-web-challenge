import busImg from '../assets/bus.png';
import carImg from '../assets/car.png';
import bikeImg from '../assets/bike.png';
import truckImg from '../assets/truck.png';
import shipImg from '../assets/ship.png';
import planeImg from '../assets/plane.png';
import rocketImg from '../assets/rocket.png';
import wagonImg from '../assets/wagon.png';

export const Categories = () => {
  const categories = [
    {
      title: 'Cars',
      image: carImg,
      quantity: 50,
    },
    {
      title: 'Bikes',
      image: bikeImg,
      quantity: 20,
    },
    {
      title: 'Trucks',
      image: truckImg,
      quantity: 3,
    },
    {
      title: 'Buses',
      image: busImg,
      quantity: 5,
    },
    {
      title: 'Planes',
      image: planeImg,
      quantity: 1,
    },
    {
      title: 'Ships',
      image: shipImg,
      quantity: 1,
    },
    {
      title: 'Rockets',
      image: rocketImg,
      quantity: 1,
    },
    {
      title: 'Wagons',
      image: wagonImg,
      quantity: 0,
    },
  ];
  return (
    <div className="categories-container mx-3 py-3">
      <div className="container">
        <div className="title-container">
          <h2>Categories</h2>
        </div>
        <div className="categories">
          {categories.map((category, index) => (
            <div className="category" key={index}>
              <img src={category.image} alt="category" />
              <h4>{category.title}</h4>
              <p>{category.quantity} available</p>
            </div>
          ))}
        </div>
        <button>Show All</button>
      </div>
    </div>
  );
};
