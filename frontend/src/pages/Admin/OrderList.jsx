import { Message } from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import { Link } from "react-router";

const OrderList = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    {orders && orders.length === 0 ? (
                        <Message variant="warning">No orders found</Message>
                    ) : (
                        <div className="w-full min-h-screen px-6 py-10 capitalize">
                            <div className="overflow-x-auto shadow-lg rounded-2xl ml-[3rem]">
                                <table className="table-auto w-full text-sm text-zinc-800">
                                    <thead className="bg-gray-100 text-zinc-800 text-sm uppercase tracking-wide">
                                        <tr>
                                            <th className="px-4 py-3 text-center">Items</th>
                                            <th className="px-4 py-3 text-center">Order ID</th>
                                            <th className="px-4 py-3 text-center">User</th>
                                            <th className="px-4 py-3 text-center">Date</th>
                                            <th className="px-4 py-3 text-center">Total</th>
                                            <th className="px-4 py-3 text-center">Paid</th>
                                            <th className="px-4 py-3 text-center">Delivered</th>
                                            <th className="px-4 py-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.orders
                                            ?.slice() // copy array so we don't mutate original
                                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
                                            .map((order)=> (
                                                <tr
                                                    key={order._id}
                                                    className="border-b hover:bg-gray-50 transition  "
                                                >
                                                    {/* Items */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2 flex-wrap justify-center">
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

                                                    {/* Order ID */}
                                                    <td className="px-4 py-3 text-center font-mono text-xs  text-cyan-700">
                                                        {order._id}
                                                    </td>

                                                    {/* User */}
                                                    <td className="px-4 py-3 text-center  text-cyan-700">
                                                        {order.user?.username || "N/A"}
                                                    </td>

                                                    {/* Date */}
                                                    <td className="px-4 py-3 text-center  text-cyan-700">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </td>

                                                    {/* Total */}
                                                    <td className="px-4 py-3 text-center  font-semibold text-cyan-700">
                                                        ₹{order.totalPrice.toLocaleString()}
                                                    </td>

                                                    {/* Paid */}
                                                    <td className="px-4 py-3 text-center text-cyan-700">
                                                        {!order.isPaid ? (
                                                            <span className="inline-block px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                                                                Not Paid
                                                            </span>
                                                        ) : (
                                                            <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                                                                Paid <br />
                                                                <span className="block text-[10px] font-light">
                                                                    {new Date(
                                                                        order.updatedAt
                                                                    ).toLocaleString()}
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
                                                                    {new Date(
                                                                        order.updatedAt
                                                                    ).toLocaleString()}
                                                                </span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <Link
                                                            to={`/order/${order._id}`} className="contents text-blue-600 hover:underline"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default OrderList;
