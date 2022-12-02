// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth } from "../firebase";

// const userAuthContext = createContext();

// export function UserAuthContextProvider({ children }) {
//   const [user, setUser] = useState({});

//   function logIn(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }
//   function signUp(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }
//   function logOut() {
//     return signOut(auth);
//   }
//   function googleSignIn() {
//     const googleAuthProvider = new GoogleAuthProvider();
//     return signInWithPopup(auth, googleAuthProvider);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
//       console.log("Auth", currentuser);
//       setUser(currentuser);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <userAuthContext.Provider
//       value={{ user, logIn, signUp, logOut, googleSignIn }}
//     >
//       {children}
//     </userAuthContext.Provider>
//   );
// }

// export function useUserAuth() {
//   return useContext(userAuthContext);
// }

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // just run once when the components gets mounts
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    //whenever the on Auth State changed I want to set current user as whatever current user is
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      //when the components is unmount we dont want to listen to the components anymore => clean up function below
      return () => {
        unsubcribe();
      };
    });
  }, []);

  //value is what we need to expose: sign up, user,
  return (
    <userAuthContext.Provider value={{ signUp, user, logIn }}>
      {children}
    </userAuthContext.Provider>
  );
}

//Making a custom hook that wrap the context ; parse the context

export function useUserAuth() {
  return useContext(userAuthContext);
}
