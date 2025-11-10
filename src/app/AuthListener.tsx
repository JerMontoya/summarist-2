"use client";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/store/authSlice";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user ? user.uid : null));
    });
    return () => unsub();
  }, [dispatch]);

  return null;
}
