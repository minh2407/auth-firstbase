import { initializeApp } from "firebase/app";
//below is manually added
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCSBoKHv8xuBpAs9rCqldrzuoZVzTv2UFU",
  authDomain: "just-aura-363902.firebaseapp.com",
  projectId: "just-aura-363902",
  storageBucket: "just-aura-363902.appspot.com",
  messagingSenderId: "914766925617",
  appId: "1:914766925617:web:c1e4c1bcae4c65f5506a10"
};

const app = initializeApp(firebaseConfig);
//below is manually added
export const auth = getAuth(app);
export default app;