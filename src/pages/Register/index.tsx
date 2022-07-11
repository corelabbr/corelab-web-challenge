import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../lib/api';
import { IUser } from '../../types/User';
import styles from './styles.module.scss';

interface IUserRegister extends IUser {
  confirmPassword: string,
  name: string;

}

export const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserRegister>({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleClearForm = () => {
    setUser({
      name: '', username: '', password: '', confirmPassword: '',
    });
  };

  const handleSubmit = async () => {
    const { password, confirmPassword } = user;
    if (password !== confirmPassword) {
      return;
    }
    createUser(user);
    navigate('/');
  };

  return (
    <main className={styles.container}>
      <h1>Register</h1>

      <form className={styles.formGroup}>
        <label htmlFor="name">
          <span>Name</span>
          <input
            type="text"
            id="name"
            placeholder="name"
            value={user.name}
            onChange={handleChange}
          />
        </label>

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
        <label htmlFor="confirmPassword">
          <span>Repeat Password </span>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Repeat Password"
            value={user.confirmPassword}
            onChange={handleChange}
          />

          {
            user.password !== user.confirmPassword
            && user.confirmPassword.length > 0
            && (
              <span className={styles.alertPassword}>
                password not match
              </span>
            )
          }
        </label>

        <div className={styles.btnWrapper}>
          <button
            id="buttonSubmit"
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
