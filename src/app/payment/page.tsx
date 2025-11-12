"use client";
import { useSearchParams } from "next/navigation";
import "./payment.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan"); // "yearly" or "monthly"
  const price = searchParams.get("price");
  return (
    <div className="payment-page">
      {/* Back Link */}
      <div className="payment-page__back">
        <FaArrowLeft className="payment-page__back-icon" />
        <Link href="/sales-page" className="payment-page__back-link">
          Back to Sales Page
        </Link>
      </div>

      {/* Plan Summary */}
      <div className="payment-page__summary">
        <p>
          You selected the <strong>{plan}</strong> plan.
        </p>
        <p>
          Price: <strong>${price}</strong>
        </p>
      </div>

      {/* Payment Form */}
      <form className="payment-page__form">
        {/* Card Information */}
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="form-input"
          />
        </div>
        <div className="form-row">
          <div className="form-group form-group--small">
            <label htmlFor="expiry">Expiration (MM/YY)</label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              className="form-input"
            />
          </div>
          <div className="form-group form-group--small">
            <label htmlFor="cvc">CVC</label>
            <input
              type="text"
              id="cvc"
              placeholder="123"
              className="form-input"
            />
          </div>
        </div>

        {/* Card Holder Name */}
        <div className="form-group">
          <label htmlFor="cardHolder">Card Holder Name</label>
          <input
            type="text"
            id="cardHolder"
            placeholder="John Doe"
            className="form-input"
          />
        </div>

        {/* Billing Address */}
        <div className="form-group">
          <label htmlFor="billingAddress">Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            placeholder="123 Main Street"
            className="form-input"
          />
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="btn btn--primary">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}
