import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setProducts,
  setChecked,
  setCategories
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

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
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  },[checked,radio,filteredProductsquery.data,dispatch,priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsquery.data?.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };
  const handleCheck = (value, id) => {
    const updatedCheck = value ? [...checked] : checked.filter((c) => c !== id);

    dispatch(setProducts(updatedCheck));
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
  return <>
  <div className="container mx-auto capitalize">
    <div className="flex md:flex-row">
        <div className="bg-[#151515 p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                filter by  categories
            </h2>

        </div>
    </div>

  </div>
  </>;
};

export default Shop;
