import { useSelector } from "react-redux";

export default function OrderHistory() {
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.auth.user);

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2 border-b pb-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Order History
              </h2>
              <p className="text-sm text-gray-500">Track your past purchases</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {user?.name}
              </p>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-4">
            <div className="divide-y divide-gray-200">
              {/* Table row */}
              {orders ? (
                orders.map((order) => (
                  <div
                    className="flex flex-wrap items-center gap-y-4 py-6"
                    key={order._id}
                  >
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Order ID:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900">
                        <a href="#" className="hover:underline">
                          # {order._id.slice(0, 10)}
                        </a>
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Date:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Price:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900">
                        {order.totalPrice}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Status:
                      </dt>
                      <dd
                        className={`me-2 mt-1.5 inline-flex items-center rounded  px-2.5 py-0.5 text-xs font-medium ${
                          order.paymentResult.status === "COMPLETED"
                            ? "text-green-800 bg-green-100"
                            : "text-yellow-500 bg-yellow-200"
                        } `}
                      >
                        {order.paymentResult.status === "COMPLETED" ? (
                          <svg
                            className="me-1 h-3 w-3"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 11.917 9.724 16.5 19 7.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="me-1 h-4 w-4 text-yellow-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                            />
                          </svg>
                        )}

                        {order.paymentResult.status}
                      </dd>
                    </dl>
                  </div>
                ))
              ) : (
                <div className="h-100 flex items-center justify-center">
                  <HashLoader
                    size={60}
                    color="#3498db"
                    loading={true}
                    speedMultiplier={1.5}
                    cssOverride={{ margin: "auto", display: "block" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
