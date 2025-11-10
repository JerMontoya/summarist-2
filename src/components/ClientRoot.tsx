"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import AuthListener from "@/app/AuthListener";
import ModalRoot from "./ModalRoot";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthListener />
      <ModalRoot />
      {children}
    </Provider>
  );
}
