import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] m-3 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-[0_0.5px_5px_#b0b0b0] hover:duration-500 transition-all  p-4 capitalize">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg w-full h-48 object-cover"
        />
        <HeartIcon product={product} />
        <Link to={`/product/${product._id}`}>
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {product.name}
            </h2>
            <span className="bg-pink-100 text-pink-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹{product.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
