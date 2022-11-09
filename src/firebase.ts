import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);
// 소셜로그인에 필요한 provider가 들어있는 firebase를 firebaseInstance라는 이름으로 export함
export const firebaseInstance = firebase;
export const authService = firebase.auth();
// Initialize Cloud Firestore and get a reference to the service
export const dbService = firebase.firestore();
export const storageService = getStorage();
