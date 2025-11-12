"use client";
import { useSearchParams } from "next/navigation";
import "./payment.css"

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan"); // "yearly" or "monthly"
  const price = searchParams.get("price");
  return (
    <div>
      <h1>Payment Page</h1>
      <p>
        You selected the <strong>{plan}</strong> plan.
      </p>
      <p>
        Price: <strong>${price}</strong>
      </p>
    </div>
  );
}
