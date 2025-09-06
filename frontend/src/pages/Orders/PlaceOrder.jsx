import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res?.createdOrder?._id}`);

    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container ml-20 pt-8  flex  flex-col items-center justify-center capitalize"  >
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto ">
            <table className="w-full border-collapse border">
              <thead>

                <tr className="border">
                  <td className=" border px-1 py-2 text-center align-top">Image</td>
                  <td className=" border px-1 py-2 text-center">Product</td>
                  <td className=" border px-1 py-2 text-center">Quantity</td>
                  <td className=" border px-1 py-2 text-center">Price</td>
                  <td className=" border px-1 py-2 text-center">Total</td>
                </tr>
              </thead>

              <tbody >
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border">
                    <td className=" border text-center p-2 ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className=" border text-center p-2">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>
                    <td className=" border text-center p-2">{item.qty}</td>
                    <td className=" border text-center p-2">{item.price.toFixed(2)}</td>
                    <td className=" border text-center p-2">
                      ₹ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5 ">Order Summary</h2>
          <div className="flex justify-between items-start  flex-wrap p-8 bg-[#383737] rounded-md ">
            <ul className="text-lg capitalize">
              <li>
                <span className="font-semibold mb-4">Items Price:</span> ₹
                {cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span> ₹
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Tax:</span> ₹
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span> ₹
                {cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}


            <div className="ml-3 ">
              <h2 className=" text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </div>
          </div>
          <div className="mt-4 p-8 bg-[#383737] rounded-md  flex-wrap flex max-w-[40rem] flex-col">
            <h2 className="text-2xl font-semibold mb-4 ">Shipping</h2>
            <p>
              <strong>Address:</strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city} {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </p>
          </div>

          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
