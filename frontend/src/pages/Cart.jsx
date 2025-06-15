import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHndler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/shipping");
    // navigate("/login?redirect=/shipping");
  };
  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto  capitalize">
        {/*if the cart is empty show error  */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen ">
            <h2 className=" font-bold text-2xl tracking-[2px]">
              your cart is empty!
            </h2>
            <br />
            <Link
              to="/shop"
              className=" text-white  ring-2 ring-pink-600 hover:duration-300  hover:ring-emerald-200  bg-pink-600 font-bold rounded-full py-2 px-10"
            >
              Go Back
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%] mt-4">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div
                  className="flex items-center mb-[1rem] pb-2 "
                  key={item._id}
                >
                  <div className="w-[5rem] h-[5rem] select-none">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-400">
                      {item.name}
                      {""}
                    </Link>

                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      {" "}
                      ₹ {item.price}
                    </div>
                  </div>
                  <div className="w-24">
                    <select
                      name="itemQty"
                      id="itemQty"
                      className="w-full border rounded text-black p-1"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHndler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="text-red-500 mr-[5rem]"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash
                      className="ml-[1rem] pointer-events-auto hover:translate-y-1 transition-all "
                      size={25}
                    />
                  </button>
                </div>
              ))}
              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>
                  <div className="text-2xl font-bold">
                    ₹{""}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                  <button
                    className="bg-pink-700 mt-4 px-4 py-2 rounded-full text-xl w-full hover:bg-pink-800 hover:duration-300"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    {"Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
