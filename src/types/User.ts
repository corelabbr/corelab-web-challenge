import { ReactNode } from 'react';

export interface IUser {
    id: string,
    name: string,
    avatar: string,
};

export interface IContextUser {
    user: IUser | undefined,
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
};

export interface IContextComponent {
    children: ReactNode,
};