import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getSubTotal,
  removeFromCart,
  updateQuantity,
} from "../redux/features/cartSlice";

export default function ShoppingCart({ open, setOpen, items }) {
  const dispatch = useDispatch();
  const subTotal = useSelector((state) => state.cart.subTotal);

  const tax = Number(subTotal) * 0.05;
  const shippingPrice = 5;
  const total = subTotal + tax + shippingPrice;

  useEffect(() => {
    dispatch(getSubTotal());
  }, [dispatch, items]);

  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-40">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {items.map((item) => (
                            <li key={item.product} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={item.name}
                                  src={item.image}
                                  className="size-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <p className="text-gray-500">
                                    {item.name.split(" ")[0].toUpperCase()}
                                  </p>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <Link to={`/products/${item.product}`}>
                                        {item.name}
                                      </Link>
                                    </h3>
                                    <p className="ml-4">{item.price}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex  items-center">
                                    <span className="mr-3">Quantity</span>
                                    <input
                                      type="number"
                                      name="quantity"
                                      min="0"
                                      defaultValue={item.quantity}
                                      className="rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 w-1/4"
                                      data-id={item.product}
                                      onBlur={(e) => {
                                        dispatch(
                                          updateQuantity({
                                            id: item.product,
                                            quantity: Number(e.target.value),
                                          })
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="flex">
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() => {
                                        dispatch(removeFromCart(item.product));
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${subTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Tax (5%)</p>
                      <p>${tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 pb-1">
                      <p>Shipping price</p>
                      <p>${shippingPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 pt-1 border-t-2 border-slate-100">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
