import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./components/AdminMenu";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import { useEffect } from "react";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();

  // Optional: If you're navigating back from update, auto-refetch
  // Could also use useEffect to refetch based on location state
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (isLoading) return <Loader />;
  if (isError)
    return <Message variant="danger">Error fetching products</Message>;

  return (
    <div className="max-w-screen-xl    sm:ml-[3rem] md:ml-[5rem] xl:ml-[10rem] px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold text-white mb-6">
            All Products{" "}
            <span className="text-gray-400">({products?.data?.length})</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5  gap-6">
            {products?.data?.map((product) => (
              <div
                key={product._id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-slate-400 transition duration-300 ring-1 ring-slate-500 "
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg text-white font-semibold capitalize">
                      {product.name}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {moment(product.createdAt).format("MMM DD, YYYY")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    {product.description?.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-pink-400 font-bold text-lg">
                      ₹{product.price}
                    </span>
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="absolute bottom-3  right-3 text-sm bg-pink-600 hover:bg-pink-700 text-white py-1 px-3 rounded"
                    >
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
