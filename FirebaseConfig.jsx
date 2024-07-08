import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWfuLCmEY65-V1aKIO5ws9j8zp2S7xDiI",
  authDomain: "smart-home-iot-5c4de.firebaseapp.com",
  databaseURL: "https://smart-home-iot-5c4de-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-home-iot-5c4de",
  storageBucket: "smart-home-iot-5c4de.appspot.com",
  messagingSenderId: "129455497192",
  appId: "1:129455497192:web:12cf5e59c6d9699dd90e5d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

