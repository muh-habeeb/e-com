import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./components/AdminMenu";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return (
      <Message variant="danger">
        {"Error:"}
        error
      </Message>
    );
  }
  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className=" text-white ml-[2rem] text-xl font-bold h-12">
            All Products({products?.length})
          </div>
          <div className="flex flex-wrap justify-around items-center">
            {products?.data?.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[10rem] object-cover"
                  />
                  <div className="p-4 flex flex-col justify-around">
                    <div className="flex justify-between items-center gap-x-1 flex-col">
                      <h4 className="text-white text-xl font-semibold mb-2 capitalize">
                        {product.name}
                      </h4>
                      <p className="text-gray-400 text-sm inline-block">
                        {moment(product.createdAt).format("MMMM DD YYYY")}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 xl:w-[30rem] md:w-[20rem] sm:[10rem] text-sm mb-4">
                    {product?.description?.substring(0, 160)}...
                  </p>
                  <div className="flex justify-between">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="
                        inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg
                        hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300
                        dark:bg-pink-600 dark:hover:bg-pink-700 dark:ring-pink-800
                    "
                    >
                      Update Product
                    </Link>
                    <p>${product?.product}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
