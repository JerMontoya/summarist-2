"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { closeModal } from "@/lib/store/modalSlice";
import LoginModal from "@/components/login-modal/LoginModal"; 

export default function ModalRoot() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null; 

  return (
    <LoginModal onClose={() => dispatch(closeModal())} />
  );
}
