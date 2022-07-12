import choose from '../assets/chooseBest.png';
import choose1 from '../assets/choose1.png';
import choose2 from '../assets/choose2.png';
import choose3 from '../assets/choose3.png';
import choose4 from '../assets/choose4.png';

export const Choose = () => {
  const reasons = [
    {
      image: choose1,
      title: 'Have Most Stock',
      description: 'We have many stock until next year to supply you needs.',
    },
    {
      image: choose2,
      title: '100% Secure',
      description:
        "You don't need to worry when transaction is on our platform now.",
    },
    {
      image: choose3,
      title: '24/7 Support',
      description: 'If any problem use our platform you cantact use free.',
    },
    {
      image: choose4,
      title: 'Free Delivery',
      description:
        'Wherever you are, we make sure you get free delivery service.',
    },
  ];
  return (
    <div className="choose-container mx-3 py-3">
      <div className="container">
        <div className="title-container">
          <h2>Why Drive into your Dev future with our Motors?</h2>
          <p>
            Many reasons why customers choose us than other ecommerce. We have
            some plus point that maybe others can't have.
          </p>
        </div>
        <div className="content">
          <div className="choose-us">
            {reasons.map((reason, index) => (
              <div className="choose" key={index}>
                <img src={reason.image} alt="reason" />
                <h4>{reason.title}</h4>
                <p>{reason.description}</p>
              </div>
            ))}
          </div>
          <div className="best-choice">
            <img src={choose} alt="best choice" />
          </div>
        </div>
      </div>
    </div>
  );
};
