import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoritesToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  // TODO:add logged or not functionality
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const FavoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(FavoritesFromLocalStorage));
  }, []);

  //   +++++++++++++++++++++++++++++++++++++++++++++++++
  //   +++++++++++++++++++++++++++++++++++++++++++++++++
  //   +++++++++++++++++++++++++++++++++++++++++++++++++

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      // /rem product from local storage
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoritesToLocalStorage(product);
    }
  };

  return (
    <div
      onClick={toggleFavorites}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" size={20} />
      ) : (
        <FaRegHeart className="text-white" size={20} />
      )}{" "}
    </div>
  );
};

export default HeartIcon;
