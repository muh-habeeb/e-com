
// IMport necessary modules and components
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setProducts,
  setChecked,
  setCategories,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import ProductCard from "./products/ProductCard";

//main function
const Shop = () => {
  //create dispatch
  const dispatch = useDispatch();
  //get state from redux store
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  //fetch categories
  const categoriesQuery = useFetchCategoriesQuery();
  //price filter state
  const [priceValue, setPriceFilter] = useState("");
  //fetch filtered products based on categories and price range
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });
  //update categories in redux store when fetched
  useEffect(() => {
    //if not loading, set categories
    if (!categoriesQuery.isLoading) {
      //set categories in redux store
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);
  //update products in redux store when fetched
  //also filter products based on price filter value
  useEffect(() => {
    //if no category is selected or price filter is applied
    if (!checked.length || radio.length) {
      //if not loading, filter products
      if (!filteredProductsQuery.isLoading) {
        //filter products based on both categories and price filter

        const filteredProducts = filteredProductsQuery.data?.data?.filter(
          (product) => {
            //if the product price include the entered price filter value
            return (
              //check if priceValue is not empty
              product.price.toString().includes(priceValue) ||
              //or if priceValue is empty, include all products
              product.price === parseInt(priceValue, 10)
              //parseInt to convert string to number
            );
          }
        );
        //set filtered products in redux store
        dispatch(setProducts(filteredProducts));
      }
    }

  },
    //run this effect when checked, radio, filteredProductsQuery.data, dispatch, priceValue, filteredProductsQuery.isLoading changes
    [checked, radio, filteredProductsQuery.data, dispatch, priceValue, filteredProductsQuery.isLoading]);
  //
  //handle category checkbox change
  const handleCheck = (value, id) => {
    //update checked categories in redux store
    const updatedCheck = value
      //if checked, add to array, else remove from array
      ? [...checked, id]
      //remove id from array
      : checked.filter((c) => c !== id);
    //set updated checked categories in redux store
    dispatch(setChecked(updatedCheck));

    // filter products based on updated categories
    const productsByCategory =
      //
      updatedCheck.length > 0
        // if categories are selected, filter products
        ? filteredProductsQuery.data?.data?.filter((product) =>
          // check if product category is in updated checked categories
          updatedCheck.includes(product.category?._id || product.category)
          // product.category?._id for populated category, product.category for non-populated
        )
        // else show all products
        : filteredProductsQuery.data?.data; // if no category selected, show all
    //set filtered products in redux store
    dispatch(setProducts(productsByCategory));
  };

  // filter by brand inside selected categories
  const handleBrandClick = (brand) => {
    const baseProducts =
      checked.length > 0
        ? filteredProductsQuery.data?.data?.filter((product) =>
          checked.includes(product.category?._id || product.category)
        )
        : filteredProductsQuery.data?.data;

    const productsByBrand = baseProducts?.filter(
      (product) => product.brand === brand
    );

    dispatch(setProducts(productsByBrand));
  };

  //get add all brands options to unique

  const uniqueBrand = [
    //get all unique brands from filtered products
    ...Array.from(
      new Set(
        filteredProductsQuery.data?.data

          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => [
    //  update the price filter state when the user type in the field
    setPriceFilter(e.target.value),
  ];
  return (
    <>
      <div className="container mx-auto capitalize">
        <div className="flex md:flex-row">
          <div className="bg-[#151515 p-3 mt-2 mb-2 border-r-pink-600 ">
            <h2 className=" text-center py-2 bg-black rounded-full mb-2">
              filter by categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.data?.map((c) => (
                <div className="mb-2" key={c._id}>
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={c._id}
                      className="w-4 h-4 text-pink-600 accent-pink-500 bg-gray-100 border-gray-300 rounded-full focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                    />
                    <label
                      htmlFor={c._id}
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300 "
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <h2 className=" text-center py-2 bg-black rounded-full mb-2 capitalize">
              Filter by brands
            </h2>

            <div className="p-5">
              {uniqueBrand?.map((brand) => (
                <div className="flex items-center mr-4 mb-5" key={brand}>
                  <input
                    type="radio"
                    name="brand"
                    id={brand}
                    onChange={() => handleBrandClick(brand)}
                  />
                  <label
                    htmlFor={brand}
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300 "
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
            <h2 className=" text-center py-2 bg-black rounded-full mb-2 capitalize">
              Filter by price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="number"
                value={priceValue}
                onChange={(e) => handlePriceChange(e)}
                placeholder="Enter the Price"
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none bg-transparent focus:ring focus:border-pink-300 "
              />
            </div>
            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                {"Reset"}
              </button>
            </div>
          </div>
          <div className="p-3">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
