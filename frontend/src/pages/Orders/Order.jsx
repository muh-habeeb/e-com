
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayOrderMutation,
} from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import { useSelector } from "react-redux";

const Order = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [createRazorpayOrder, { isLoading: loadingRazorpay }] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayOrder] = useVerifyRazorpayOrderMutation();

  const handleRazorpayPayment = async () => {
    try {
      // 1. Create order on backend
      const razorpayOrder = await createRazorpayOrder({
        amount: order?.order?.totalPrice, // backend converts to paisa
      }).unwrap();
      // 2. Configure checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from .env (frontend)
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "E-com",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            // 3. Notify backend about successful payment
            const result = await verifyRazorpayOrder(response);
            if (result.data.success) {
              await payOrder({
                orderId,
                details: response, // contains payment_id, order_id, signature
              }).unwrap();

              refetch();
              toast.success("Payment Successful!");
            } else {
              return toast.error("Payment verification failed");
            }

          } catch (err) {
            toast.error(err?.data?.message || err.message);
          }
        },
        prefill: {
          name: order?.order?.user?.name,
          email: order?.order?.user?.email,
        },
        theme: {
          color: "#F472B6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
  // ✅ Mark order as delivered
  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success("Order Delivered!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message}</Message>;

  return (
    <div className="container mx-auto p-4  capitalize">
      <h1 className="text-2xl font-bold mb-4">Order Id: {order?.order?._id}</h1>

      {/* Shipping */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Shipping</h2>
        <p>
          <strong>Name:</strong> {order?.order?.user?.username}
        </p>
        <p>
          <strong>Email:</strong> {order?.order?.user?.email}
        </p>
        <p>
          <strong>Address:</strong> {order?.order?.shippingAddress?.address},{" "}
          {order?.order?.shippingAddress?.city},{" "}
          {order?.order?.shippingAddress?.postalCode},{" "}
          {order?.order?.shippingAddress?.country}
        </p>
        {order?.order?.isDelivered ? (
          <Message variant="success">Delivered</Message>
        ) : (
          <Message variant="danger">Not Delivered</Message>
        )}
      </div>

      {/* Payment */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <p>
          <strong>Method:</strong> {order?.order?.paymentMethod}
        </p>
        {order?.order?.isPaid ? (
          <Message variant="success">Paid</Message>
        ) : (
          <Message variant="danger">Not Paid</Message>
        )}
      </div>

      {/* Order Items */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Order Items</h2>
        {order?.order?.orderItems.map((item) => (
          <div
            key={item.product}
            className="flex justify-between border-b py-2"
          >
            <div>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
            </div>
            <div>
              {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p>Items Price: ₹{order?.order?.itemsPrice}</p>
        <p>Shipping: ₹{order?.order?.shippingPrice}</p>
        <p>Tax: ₹{order?.order?.taxPrice}</p>
        <p>Total: ₹{order?.order?.totalPrice}</p>

        {/* Razorpay Button */}
        {!order?.order?.isPaid && (
          <div>
            <button
              type="button"
              onClick={handleRazorpayPayment}
              disabled={loadingRazorpay}
              className={`bg-pink-500 text-white w-full py-2 mt-3 rounded flex items-center justify-center ${loadingRazorpay ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {loadingRazorpay ? <Loader /> : "Pay with Razorpay"}
            </button>

          </div>
        )}
        {/* Deliver Button for Admin */}
        {userInfo && userInfo?.isAdmin && order?.order?.isPaid && !order?.order?.isDelivered && (
          <button
            type="button"
            onClick={deliverHandler}
            className="bg-green-600 text-white w-full py-2 mt-3 rounded"
          >
            Mark as Delivered
          </button>
        )}
        {loadingDeliver && <Loader />}
      </div>
    </div>
  );
};

export default Order;
