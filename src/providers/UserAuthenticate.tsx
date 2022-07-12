import {
  createContext, ReactNode, useMemo, useState,
} from 'react';
import decode from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import { login } from '../lib/api';
import { IUser } from '../types/User';

type decodeJWT = {
  exp: number;
  iat: number;
  sub: number;
  username: string;
}

type propsProvider = {
  children: ReactNode;
}
type typeUserContext = {
  user: IUser;
  token: string;
  sigIn: (user?: IUser) => Promise<boolean>;
  logOut: () => void;
}
export const UserContext = createContext<typeUserContext>({} as typeUserContext);

export const UserProvider = ({ children }: propsProvider) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();

  const sigIn = async (userLogin?: IUser) => {
    let accessToken = window.localStorage.getItem('@tokenCoreLab');

    if (userLogin) {
      const payload = await login(userLogin.username, userLogin.password) as unknown as {
      accessToken: string };
      accessToken = payload.accessToken;
    }

    if (accessToken) {
      const { sub: id, username: usernameDecode } = decode(accessToken) as unknown as decodeJWT;
      setUser({ id, username: usernameDecode, password: userLogin?.password || '' });
      setToken(accessToken);
      window.localStorage.setItem('@tokenCoreLab', accessToken);
    } else {
      return false;
    }

    if (userLogin) { navigate('/'); }

    return !!accessToken;
  };

  const logOut = () => {
    setUser({} as IUser);
    setToken('');
    window.localStorage.removeItem('@tokenCoreLab');
    window.location.reload();
  };

  const context = useMemo(() => ({
    user, sigIn, logOut, token,
  }), [user, token]);

  return (

    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
};
