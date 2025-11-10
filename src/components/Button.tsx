"use client";

import { useSelector, useDispatch } from "react-redux";
import { openModal } from "@/lib/store/modalSlice";

interface SomeButtonProps {
  text?: string; 
  icon?: React.ReactNode;
}

export default function SomeButton({ text = "Read", icon }: SomeButtonProps) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: any) => state.auth?.isLoggedIn);

  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(openModal());
      return;
    }

    console.log("User is logged in, continue...");
  };

  return (
    <button onClick={handleClick} className="inner-book__read--btn">
      {icon && <div className="inner-book__read--icon">{icon}</div>}
      <div className="inner-book__read--text">{text}</div>
    </button>
  );
}
