import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/firebase.init";

export const AuthContext = createContext();

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const signInWithMail = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const createWithMail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleSign = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  useEffect(() => {
    const unscrbd = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unscrbd();
    };
  }, []);
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const authInfo = {
    user,
    setUser,
    loading,
    googleSign,
    createWithMail,
    signInWithMail,
    updateUserProfile,
    logOut,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
