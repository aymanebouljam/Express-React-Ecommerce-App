import { useDispatch, useSelector } from "react-redux";
import { selectTax, selectShippingPrice } from "../redux/features/billingSlice";
import { fetchUserOrders } from "../redux/features/ordersSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Summary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderItems = useSelector((state) => state.cart.items);

  const shippingAddress = useSelector((state) => state.summary.shippingAddress);

  const calculateItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const subTotal = useSelector((state) => state.cart.subTotal);

  const taxes = useSelector(selectTax);

  const shippingPrices = useSelector(selectShippingPrice);

  const { country } = shippingAddress;

  const taxRate = taxes.find((tax) => tax.country === country)?.rate;

  const tax = subTotal * taxRate;
  const shipping = shippingPrices.find(
    (price) => price.type === (country === "Morocco" ? "local" : "foreign")
  )?.price;

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = useSelector((state) => state.auth.token);

  const total = subTotal + tax + shipping;

  const submitOrder = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/orders`,
        { orderItems, shippingAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchUserOrders(token));

      navigate(`/payment/${res.data._id}`);
    } catch (error) {
      console.error(
        "Order creation failed: ",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-24 py-16 bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Review</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300"
          onClick={submitOrder}
        >
          Pay Now
        </button>
      </div>

      {/* Table for desktop/tablet */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Product
              </th>
              <th className="px-4 py-2 text-center font-semibold text-gray-700">
                Qty
              </th>
              <th className="px-4 py-2 text-right font-semibold text-gray-700">
                Unit Price
              </th>
              <th className="px-4 py-2 text-right font-semibold text-gray-700">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orderItems.map((item) => (
              <tr key={item.product}>
                <td className="flex items-center gap-3 px-4 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-gray-800">{item.name}</span>
                </td>
                <td className="text-center text-gray-600">{item.quantity}</td>
                <td className="text-right text-gray-600">
                  ${item.price.toFixed(2)}
                </td>
                <td className="text-right text-gray-800 font-medium pr-2">
                  ${calculateItemTotal(item)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  Card View for mobile */}
      <div className="sm:hidden flex flex-col gap-4">
        {orderItems.map((item) => (
          <div
            key={item.product}
            className="bg-white p-4 rounded-lg shadow border"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-gray-800 font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <div>Unit Price: ${item.price.toFixed(2)}</div>
              <div className="font-semibold">
                Subtotal: ${calculateItemTotal(item)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Order Summary */}
      <div className="mt-4 border border-gray-100 p-6 rounded-lg shadow-sm bg-white">
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">${Number(subTotal).toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-600">
            Tax ({Number(taxRate * 100).toFixed(1)}%):
          </span>
          <span className="font-medium">${Number(tax).toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-medium">${Number(shipping).toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 border-t mt-2 font-semibold text-lg">
          <span>Total:</span>
          <span>${Number(total).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
