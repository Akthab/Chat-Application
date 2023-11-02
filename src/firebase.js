import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCacTfUSaSipIC4h9OdX-4S9azfyh_4Nko',
	authDomain: 'chatapp-cbdd5.firebaseapp.com',
	projectId: 'chatapp-cbdd5',
	storageBucket: 'chatapp-cbdd5.appspot.com',
	messagingSenderId: '402724175627',
	appId: '1:402724175627:web:7c32ff2617ae2374f72c0e',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
