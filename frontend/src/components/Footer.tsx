import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
export const Footer = () => {
  const data = [
    {
      type: 'Product',
      subTypes: [
        'Landing Page',
        'Features',
        'Documentation',
        'Referral Program',
        'Pricing',
      ],
    },
    {
      type: 'Services',
      subTypes: [
        'Documentation',
        'Design',
        'Themes',
        'Illustrations',
        'UI Kit',
      ],
    },
    {
      type: 'Company',
      subTypes: ['About', 'Terms', 'Privacy Policy', 'Careers'],
    },
    {
      type: 'More',
      subTypes: ['Documentation', 'License', 'Changelog'],
    },
  ];
  const socialLinks = [
    <BsFacebook />,
    <BsInstagram />,
    <BsTwitter />,
    <BsLinkedin />,
  ];
  return (
    <footer className="py-3 mx-3">
      <div className="brand-container">
        <div className="brand">
          <span>DevMotors</span>
        </div>
        <p className="description">The fastest way to reach your future</p>

        <ul className="social-links">
          {socialLinks.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
      <div className="links">
        {data.map(({ type, subTypes }, index) => {
          return (
            <div className="link" key={index}>
              <h3 className="title">{type}</h3>
              <ul>
                {subTypes.map((type, index) => (
                  <li key={index}>
                    <a href="#">{type}</a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </footer>
  );
};
