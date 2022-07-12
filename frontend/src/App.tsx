import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import './styles/index.scss';
import scrollReveal from 'scrollreveal';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { useEffect, useState } from 'react';
import { Categories } from './components/Categories';
import { Recommended } from './components/Recommended';
import { Choose } from './components/Choose';
import { Favorites } from './components/Favorites';
import { Promo } from './components/Promo';
import { WeeklyDeals } from './components/WeeklyDeals';
import { Vehicles } from './components/Vehicles';

function App() {
  const [theme, setTheme] = useState('dark');

  const changeTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  useEffect(() => {
    const registerAnimations = () => {
      const sr = scrollReveal({
        origin: 'bottom',
        distance: '80px',
        duration: 2000,
        reset: false,
        mobile: false,
      });

      sr.reveal(
        `
        nav,
        .home,
        .vehicles-container,
        .categories-container,
        .weekly-deals-container,
        .recommended-container,
        .choose-container,
        .favorites-container,
        .promo-container,
        footer`,
        { interval: 500 }
      );
    };
    registerAnimations();
  }, []);

  return (
    <div className="app" data-theme={theme}>
      <Navbar changeTheme={() => changeTheme()} currentTheme={theme} />
      <Home />
      <Vehicles />
      <Categories />
      <WeeklyDeals />
      <Recommended />
      <Choose />
      <Favorites />
      <Promo />
      <Footer />
    </div>
  );
}

export default App;
