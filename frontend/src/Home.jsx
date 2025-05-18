import { Link, useParams } from "react-router-dom";
import Loader from "./components/Loader";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Header from "./components/Header.jsx";
import { Message } from "./components/Message.jsx";
import Product from "./pages/products/Product.jsx";
const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Message variant="danger">{"Error While Fetching Data"}</Message>;
  }

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? null : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.message
            ? isError?.data?.message || isError.message
            : "ERROR!!"}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center ">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem] text-white select-none">
              Special Products
            </h1>
            <Link
              to="/shop"
              className=" text-white  ring-2 ring-pink-600 hover:duration-300  hover:ring-emerald-200  bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data?.data?.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
