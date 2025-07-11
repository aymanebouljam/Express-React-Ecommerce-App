import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSummary } from "../redux/features/summarySlice";

export default function Checkout() {
  const orderItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const street = e.target.elements.street.value;
    const city = e.target.elements.city.value;
    const zipCode = e.target.elements.zipCode.value;
    const country = e.target.elements.country.value;

    if (!street || !city || !zipCode || !country) {
      alert("All fields are required");
      return;
    } else {
      const shippingAddress = {
        address: street,
        city,
        postalCode: zipCode,
        country,
      };
      try {
        if (orderItems.length === 0) {
          alert("Cart is empty !");
          return;
        } else {
          dispatch(setSummary(shippingAddress));
          navigate(`/summary`);
        }
      } catch (err) {
        console.error(
          "Order Failed: ",
          err.response?.data?.error || err.message
        );
      }
    }
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://www.svgrepo.com/show/415710/ecommerce-price-price-tag.svg"
            alt="logo"
          />
          Shopy
        </a>
        <div className="w-full bg-white rounded-lg shadow border sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Checkout
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Shipping Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Shipping Address
                </h3>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="123 Main St"
                    name="street"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      City
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Casablanca"
                      name="city"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Postal / ZIP
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="20000"
                      name="zipCode"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Country
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    name="country"
                  >
                    <option value="Morocco">Morocco</option>
                    <option value="France">France</option>
                    <option value="United States">United States</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
