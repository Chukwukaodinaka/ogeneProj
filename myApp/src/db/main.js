import {initializeApp}  from "firebase/app";
import { getDatabase } from "firebase/database";

const config =  {
    apiKey: "AIzaSyCUkIx6wpnFJ-ha-K-T6fC_s5F6vtYzpdM",
    authDomain: "firechat-7614d.firebaseapp.com",
    projectId: "firechat-7614d",
    storageBucket: "firechat-7614d.appspot.com",
    messagingSenderId: "697371447520",
    appId: "1:697371447520:web:6610a7c9659f381d7c8085",
    measurementId: "G-KL60ZFKL0X"
};

const app = initializeApp(config);
const db = getDatabase(app)
