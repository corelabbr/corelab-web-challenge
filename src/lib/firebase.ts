import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyD6zSLDVD3Uznw173yHxEVJpUHUCT8gQJw',
	authDomain: 'corelab-teste.firebaseapp.com',
	projectId: 'corelab-teste',
	storageBucket: 'corelab-teste.appspot.com',
	messagingSenderId: '957519878485',
	appId: '1:957519878485:web:ef85e9ac8ec9365287b7dc'
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { firebase, auth, firebaseConfig };