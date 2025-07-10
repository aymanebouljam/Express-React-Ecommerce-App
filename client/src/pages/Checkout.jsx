import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout() {
  return (
    <form className="w-full max-w-2xl mx-auto my-20 p-6 bg-white rounded-2xl shadow-md border space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+212 600-000000"
          />
        </div>
      </div>

      {/* Shipping Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Shipping Address
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="123 Main St"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Casablanca"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal / ZIP
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="20000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Morocco</option>
            <option>France</option>
            <option>United States</option>
            <option>Germany</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Confirm Order
      </button>
      <div className="mt-4">
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "162.47", // Total order amount
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
    </form>
  );
}
