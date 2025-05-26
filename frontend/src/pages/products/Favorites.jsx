import { useSelector } from "react-redux";

import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Favorites = () => {
  const navigate = useNavigate();
  const favorites = useSelector(selectFavoriteProduct);
  // const clearALlProduct = () => {
  //   //ask confirmation
  //   let cf = confirm("You Want to remove all products?");
  //   // if yes delete all
  //   if (cf) {
  //     localStorage.clear();
  //     navigate("/favorite");
  //   } // don't do anything just exit th e function
  //   else {
  //     return;
  //   }
  // };
  return (
    <div className="ml-[10rem]">
      <div className="flex justify-between items-center text-white">
        <h1 className="text-white  text-2xl font-bold ml-[3rem] mt-[3rem] capitalize">
          favorite products
        </h1>
        <FaTrashAlt
          // onClick={clearALlProduct}
          size={23}
          className="mr-[3rem] mt-[3rem] cursor-pointer hover:duration-200 hover:text-pink-700"
        />
      </div>
      <div className="flex flex-wrap">
        {favorites.map((fp) => (
          <Product key={fp._id} product={fp} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
