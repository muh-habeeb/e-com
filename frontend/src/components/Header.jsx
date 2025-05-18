import ProductCarousel from "../pages/products/ProductCarousel";
import SmallProduct from "../pages/products/SmallProduct";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";

// import
const Header = () => {
  const { data, isLoading, isError } = useGetTopProductsQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Message variant="danger">{"Error While Fetching Data"}</Message>;
  }

  return (
    <>
      <div className="flex ">
        <div className="xl:block lg:hidden md:hidden sm:hidden  ml-[5rem]">
          <div className="grid grid-cols-2 gap-4">
            {data?.data?.map((product) => (
              <SmallProduct key={product._id} product={product} />
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
