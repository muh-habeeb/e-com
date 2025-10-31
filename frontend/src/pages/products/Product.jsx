// Product Card Component
// Displays individual product information
// Features:
// - Product image
// - Heart icon for favorites
// - Price display
// - Link to product details

import { Link } from "react-router";
import HeartIcon from "./HeartIcon";
// product card
const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-[30rem] rounded-md h-[25rem] object-cover"
        />
        <HeartIcon product={product} />
      </div>
      <div className="p4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg text-white ml-2 capitalize">
              {product.name}
            </div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 mt-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹{product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
