import { HiArrowSmRight } from 'react-icons/hi';
import service1 from '../assets/service1.png';
import service2 from '../assets/service2.png';
import service3 from '../assets/service3.png';
import service4 from '../assets/service4.png';

export const WeeklyDeals = () => {
  return (
    <div className="weekly-deals-container mx-3 py-3">
      <div className="container">
        <div className="service one">
          <p>Weekly Deals</p>
          <h4>Free Delivery</h4>
          <button>Learn More</button>
          <div className="image">
            <img src={service1} alt="service 1" />
          </div>
        </div>
        <div className="service two">
          <div className="image">
            <img src={service2} alt="service 2" />
          </div>
          <div className="content">
            <h4>Disc up to 25%</h4>
            <p>
              Learn More <HiArrowSmRight />
            </p>
          </div>
        </div>
        <div className="service three">
          <div className="image">
            <img src={service3} alt="service 3" />
          </div>
          <div className="content">
            <h4>20 liters of free fuel</h4>
            <p>
              Learn More <HiArrowSmRight />
            </p>
          </div>
        </div>
        <div className="service 4">
          <p>DevMotors Monthly Deals</p>
          <h4>Free Delivery</h4>
          <p>
            Learn More <HiArrowSmRight />
          </p>
          <div className="image">
            <img src={service4} alt="service 4" />
          </div>
        </div>
      </div>
    </div>
  );
};
