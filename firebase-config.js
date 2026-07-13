import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvAWtYuK6a70wfUUXLK2PKlWS2-SOstCU",
  authDomain: "tms-membership.firebaseapp.com",
  projectId: "tms-membership",
  storageBucket: "tms-membership.firebasestorage.app",
  messagingSenderId: "91628302504",
  appId: "1:91628302504:web:7558e2debcf636ccc2529d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
