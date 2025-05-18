//add a product local storage

export const addFavoritesToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((p) => p._id === product)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
  console.log(product);
  
};
//remove from localstorage

export const removeFavoriteFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const updateFavorites = favorites.filter(
    (product) => product._id !== productId
  );
  localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};

//get product s from local storage
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
