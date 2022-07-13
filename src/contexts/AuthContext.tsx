import { createContext, useEffect, useState } from 'react';
import { IContextComponent, IContextUser, IUser } from '../types/User';
import { auth, firebase } from '../lib/firebase';
import { dataValidation } from './Hooks';

export const AuthContext = createContext({} as IContextUser );

export function AuthContextProvider({ children }: IContextComponent){

	const [user, setUser] = useState<IUser>();

	useEffect(()=> {
		const subscriber = auth.onAuthStateChanged(user => { 
			const result = dataValidation(user);
			setUser({
				id: result?.uid,
				name: result?.displayName,
				avatar: result?.photoURL
			});
		});
		return () => { subscriber(); };
	},[]);

	async function signInWithGoogle(){

		const provider = new firebase.auth.GoogleAuthProvider();

		const login = await auth.signInWithPopup(provider);

		const result = dataValidation(login.user);

		setUser({
			id: result?.uid,
			name: result?.displayName,
			avatar: result?.photoURL
		});
	}

	async function signOut(){

		await auth.signOut();

	}

	return(

		<AuthContext.Provider value={{user, signInWithGoogle, signOut}}>
			{children}
		</AuthContext.Provider>

	);
}