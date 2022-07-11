import {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserAuthenticate';
import { IUser } from '../../types/User';
import styles from './styles.module.scss';

export const Login = () => {
  const [user, setUser] = useState({} as IUser);
  const navigate = useNavigate();
  const { sigIn, token } = useContext(UserContext);
  const [invalidLogin, setInvalidLogin] = useState(false);

  useEffect(() => {
    const login = async () => {
      sigIn();
      if (token) {
        navigate('/');
      }
    };

    login();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
    setInvalidLogin(false);
  };

  const handleClearForm = () => {
    setUser({ username: '', password: '' });
  };

  const handleSubmit = async () => {
    const response = await sigIn(user);

    if (!response) {
      setInvalidLogin(true);
    }
  };

  return (
    <main className={styles.container}>
      <div className={invalidLogin ? styles.alertLogin : styles.hidden}>
        <span>User or password invalid!</span>
      </div>
      <h1>Login</h1>
      <form className={styles.formGroup}>
        <label htmlFor="username">
          <span>Username</span>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          <span>Password</span>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </label>

        <div className={styles.btnWrapper}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={handleSubmit}
          >

            Submit
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={handleClearForm}
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
};
