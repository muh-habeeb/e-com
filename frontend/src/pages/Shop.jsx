import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceValue, setPriceFilter] = useState("");

  const filteredProductsquery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || radio.length) {
      if (!filteredProductsquery.isLoading) {
        //filter products based on both categories and price filter

        const filteredProducts = filteredProductsquery.data?.data?.filter(
          (product) => {
            //if the product price include the entered price filter value
            return (
              product.price.toString().includes(priceValue) ||
              product.price === parseInt(priceValue, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsquery.data, dispatch, priceValue]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsquery.data?.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedCheck = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);

    dispatch(setChecked(updatedCheck));
  };

  //get add allbrands options to unique

  const uniqueBrand = [
    ...Array.from(
      new Set(
        filteredProductsquery.data?.data
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
                  <div className="fle items-center mr-4">
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
                    onChange={(e) => handleBrandClick(brand)}
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
