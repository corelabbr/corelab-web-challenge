export function dataValidation(user: any){
	if(user){
		const { uid, displayName, photoURL } = user;
		if(!displayName || !photoURL){
			throw new Error('Está faltando informações na sua conta google');
		}

		return {
			uid, displayName, photoURL
		};
	}
}