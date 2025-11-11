"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { openModal } from "@/lib/store/modalSlice";

interface SomeButtonProps {
  text?: string; 
  icon?: React.ReactNode;
  bookId?: string;
  isBookPremium?: boolean;
}

export default function SomeButton({ text = "Read", icon, bookId, isBookPremium = false, }: SomeButtonProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const {uid, subscription, isLoading} = useSelector((state: any) => state.auth);

  const handleClick = () => {
    if (isLoading) return;

    if (!isBookPremium) {
        if (bookId) router.push(`/player/${bookId}`);
        return;
    }
    if (!uid) {
      dispatch(openModal());
      return;
    } 
    if (subscription === "basic"){
        router.push("/sales-page");
        return;
    }
    if (subscription === "premium"){
        if (bookId) router.push(`/player/${bookId}`);
        return;
    }

  };

  return (
    <button onClick={handleClick} className="inner-book__read--btn">
      {icon && <div className="inner-book__read--icon">{icon}</div>}
      <div className="inner-book__read--text">{text}</div>
    </button>
  );
}
