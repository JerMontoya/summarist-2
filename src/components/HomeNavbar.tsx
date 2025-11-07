"use client";

import { useDispatch } from "react-redux";
import { openModal } from "@/lib/store/modalSlice";
import "./HomeNavbar.css";

export default function HomeNavbar() {
  const dispatch = useDispatch();

  return (
    <nav className="p-4 bg-black/80">
      <div className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img src="/logo.png" className="nav__img" alt="logo" />
          </figure>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login">

            <button onClick={() => dispatch(openModal())} className="nav__button">Login</button>
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
