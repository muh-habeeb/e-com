import { Message } from "../../components/Message"
import Loader from "../../components/Loader"
import { Link } from "react-router"
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice"

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery()
  console.log(orders)
  console.log(error);

  return (
    <>
      <div className="container mx-auto capitalize" >

        <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

        {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (
          <>
            {orders && orders.length === 0 ? (<Message variant="info">You have no orders yet. <Link to="/shop" className="text-blue-500 underline">Start Shopping</Link></Message>) : (

              <table className=" text-center min-w-full der border-gray-200 border-collapse">
                <thead>
                  <tr className="">
                    <td className="border border-gray-200 p-2">Image</td>
                    <td className="border border-gray-200 p-2">item Name</td>
                    <td className="border border-gray-200 p-2">order id</td>
                    <td className="border border-gray-200 p-2">date</td>
                    <td className="border border-gray-200 p-2">total</td>
                    <td className="border border-gray-200 p-2">paid</td>
                    <td className="border border-gray-200 p-2">delivered</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders?.orders.map((order) => (
                      <tr key={order._id} className="text-center">
                        {/* Show all product images in this order */}
                        <td className="border border-gray-200 p-2">
                          <div className="flex gap-2 justify-center flex-wrap w-[10rem]">
                            {order.orderItems.map((item) => (
                              <img
                                key={item._id}
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            ))}
                          </div>
                        </td>

                        {/* Item Name */}
                        <td className="border border-gray-200 p-2">{order.orderItems.map(item => item.name).join(", ")}</td>
                        {/* Order ID */}
                        <td id={order._id} aria-label="Order ID" aria-valuetext={order._id} className="border border-gray-200 p-2">{order._id.toString().substring(0, 8)}</td>

                        {/* Created At */}
                        <td className="border border-gray-200 p-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>

                        {/* Total Price */}
                        <td className="border border-gray-200 p-2">
                          ₹{order.totalPrice.toLocaleString()}
                        </td>

                        {/* Paid */}
                        <td className="border border-gray-200 p-2">
                          {order.isPaid ? "✅ Yes" : "❌ No"}
                        </td>

                        {/* Delivered */}
                        <td className="border border-gray-200 p-2">
                          {order.isDelivered ? "✅ Yes" : "❌ No"}
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
              // <ul>
              //   {orders.map((order) => (
              //     <li key={order.id}>
              //       <Link to={`/order/${order.id}`} className="text-blue-500 underline">
              //         Order #{order.id}
              //       </Link>
              //     </li>
              //   ))}
              // </ul>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default UserOrder