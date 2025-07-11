import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function Payment() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const token = useSelector((state) => state.auth.token);
  const { orderId } = useParams();

  const [totalPrice, setTotalPrice] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${baseURL}/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalPrice(res.data?.totalPrice);
      } catch (err) {
        console.error(
          "Error while fetching order details: ",
          err.response?.data?.error ?? err.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, baseURL, token]);

  const storePaymentResult = async (paymentId, email) => {
    try {
      const res = await axios.patch(
        `${baseURL}/orders/${orderId}/payment`,
        {
          id: paymentId,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/confirmation/${res.data._id}`);
    } catch (err) {
      console.error(
        "Error storing payment result: ",
        err.response?.data?.error ?? err.message
      );
      alert("Payment failed");
    }
  };

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <HashLoader
          size={60}
          color="#3498db"
          loading={true}
          speedMultiplier={1.5}
          cssOverride={{ display: "block", margin: "0 auto" }}
        />
        <p className="mt-6 text-gray-600 text-lg font-medium animate-pulse">
          Chargement de votre commande...
        </p>
      </div>
    </div>
  ) : (
    <div className="relative z-0">
      <PayPalScriptProvider options={{ "client-id": clientId }}>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
              Finalize your payment
            </h2>
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "paypal",
                zIndex: -10,
              }}
              createOrder={async (_, actions) => {
                if (!orderId || !totalPrice) {
                  console.error("No order ID or total price was provided");
                  return;
                }
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPrice.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (_, actions) => {
                const details = await actions.order.capture();
                const paymentId = details.id;
                const email = details.payment_source?.paypal?.email;

                storePaymentResult(paymentId, email);
              }}
              onError={(error) => {
                console.error("PayPal error: ", error.message);
              }}
            />
          </div>
        </div>
      </PayPalScriptProvider>
    </div>
  );
}
