import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/features/cartSlice";
import { clearSummary } from "../redux/features/summarySlice";

export default function ConfirmationPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    dispatch(clearSummary());
  }, [dispatch]);
  return (
    <section className="bg-white py-16 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Thank you for your order!
        </h2>
        <p className="text-gray-600 mb-8">
          We've received your request and are processing it. You'll receive an
          email confirmation shortly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-block bg-white border border-gray-300 text-sm text-gray-700 font-medium py-2.5 px-6 rounded-lg hover:bg-gray-100 hover:text-blue-600"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
