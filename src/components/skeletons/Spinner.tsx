"use client";

import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="spinner__wrapper">
      <FaSpinner className="spinner__icon" />
    </div>
  );
}
