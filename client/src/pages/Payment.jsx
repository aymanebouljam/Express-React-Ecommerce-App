import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function Payment() {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
      <div className="mt-4">
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          }}
          createOrder={(_, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(
                "Transaction completed by " + details.payer.name.given_name
              );
            });
          }}
          onError={(err) => {
            console.error("PayPal error", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
