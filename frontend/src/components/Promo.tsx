import promoImg from '../assets/promo.png';

export const Promo = () => {
  return (
    <div className="promo-container">
      <div className="container mx-3 py-3">
        <div className="content">
          <div className="title-container">
            <h2>Never Miss a Promo</h2>
            <p>
              We always give our Customers a promo for being loyal to us. Just
              subscribe :)
            </p>
          </div>
          <div className="subscribe-container">
            <input type="email" placeholder="yourbestemail@email.com" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="promo-image">
          <img src={promoImg} alt="promo image" />
        </div>
      </div>
    </div>
  );
};
