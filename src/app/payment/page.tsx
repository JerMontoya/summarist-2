import { Suspense } from "react";
import PaymentClient from "./PaymentClient";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment info…</div>}>
        <PaymentClient />
      </Suspense>
  );
}
