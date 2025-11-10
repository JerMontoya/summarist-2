"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; 
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { logout } from "@/lib/store/authSlice";
import { RootState } from "@/lib/store/store";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  const uid = useSelector((state: RootState) => state.auth.uid);

  const handleLogout = async () => {
    try {
      if (uid) await signOut(auth);
      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className="sidebar__link--text cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
}
