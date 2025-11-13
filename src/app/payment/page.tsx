// import "./payment.css";
// import Link from "next/link";
import { Suspense } from "react";
// import { FaArrowLeft } from "react-icons/fa";
import PaymentClient from "./PaymentClient";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment info…</div>}>
        <PaymentClient />
      </Suspense>
  );
}
