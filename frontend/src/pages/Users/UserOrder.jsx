import { Message } from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="  mx-auto py-10  px-4">
      <h2 className="text-3xl font-bold  mb-6 text-center text-white">
        My Orders
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {orders && orders.length === 0 ? (
            <Message variant="warning">
              You have no orders yet.{" "}
              <Link to="/shop" className="text-blue-500 underline">
                Start Shopping
              </Link>
            </Message>
          ) : (
            <div className=" ml-14 overflow-x-auto shadow-md rounded-2xl">
              <table className="table-auto w-full text-sm text-gray-700 border-collapse">
                <thead className="bg-gray-100 text-gray-900 uppercase text-xs tracking-wide">
                  <tr>
                    <th className="px-4 py-3 text-center">Items</th>
                    <th className="px-4 py-3 text-center">Name(s)</th>
                    <th className="px-4 py-3 text-center">Order ID</th>
                    <th className="px-4 py-3 text-center">Date</th>
                    <th className="px-4 py-3 text-center">Total</th>
                    <th className="px-4 py-3 text-center">Paid</th>
                    <th className="px-4 py-3 text-center">Delivered</th>
                    <th className="px-4 py-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Images */}
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center flex-wrap w-[10rem]">
                          {order.orderItems.map((item) => (
                            <img
                              key={item._id}
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md shadow-sm"
                            />
                          ))}
                        </div>
                      </td>

                      {/* Item Names */}
                      <td className="px-4 py-3 text-center">
                        {order.orderItems
                          .map((item, i) => `${i + 1}: ${item.name}`)
                          .join(", ")}
                      </td>

                      {/* Order ID */}
                      <td className="px-4 py-3 text-center font-mono text-xs text-gray-600">
                        {order._id.toString().substring(0, 8)}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-center">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      {/* Total */}
                      <td className="px-4 py-3 text-center font-semibold">
                        ₹{order.totalPrice.toLocaleString()}
                      </td>

                      {/* Paid */}
                      <td className="px-4 py-3 text-center">
                        {!order.isPaid ? (
                          <span className="inline-block px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                            Not Paid
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                            Paid <br />
                            <span className="block text-[10px] font-light">
                              {new Date(order.updatedAt).toLocaleString()}
                            </span>
                          </span>
                        )}
                      </td>

                      {/* Delivered */}
                      <td className="px-4 py-3 text-center">
                        {!order.isDelivered ? (
                          <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600 font-medium">
                            Pending
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                            Delivered <br />
                            <span className="block text-[10px] font-light">
                              {new Date(order.updatedAt).toLocaleString()}
                            </span>
                          </span>
                        )}
                      </td>

                      {/* View Details */}
                      <td className="px-4 py-3 text-center">
                        <Link
                          to={`/order/${order._id}`}
                          className="text-blue-500 hover:underline text-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserOrder;
