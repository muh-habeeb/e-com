import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
const ProductDetails = () => {
  const { id: productId } = useParams(); // destructure the id from parameter
  const navigate = useNavigate(); // initialize usenavigate

  const [qty, setQty] = useState(1); //set default quantity
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    isError,
  } = useGetProductDetailsQuery(productId);
  useEffect(() => {
    refetch;
  }, [refetch]);
  const { userInfo } = useSelector((state) => state.auth);
  const addToCartHandler = () => {};
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
    console.log(product);
    
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    
      let result=await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      console.log(result);
      
      refetch();
      if(result.MESSAGE==="REVIEW_ADDED"){
        toast.success("Review Created Successfully");
        navigate('/')
      }else if(result.MESSAGE==="ALREADY_REVIEWED_BY_THE USER_ONCE"){
        toast.warn("You Are Already posted th Review!")
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      console.log(error);
      
    }
  };
  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white select-none font-semibold hover:underline ml-[10rem] cursor-pointer"
        >
          {"Go Back"}
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message ||
            isError.message ||
            "Error fetching product details!"}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap select-none relative items-center  mt-[2rem] ml-[10rem] ">
            <div>
              <img
                src={product?.data?.image}
                alt={product?.data?.name}
                className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] object-contain sm:w-[20rem] mr-[2rem] h-[500px]"
              />
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold text-white">
                {product?.data?.name}
              </h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#b0b0b0] text-xl font-semibold">
                {product?.data?.description}
              </p>
              <p className="text-white text-5xl my-4 font extrabold">
                ₹ {product?.data?.price}
              </p>
              <div className="flex items-center justify-between w-[20rem] text-white">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" />
                    Brand:{product?.data?.brand}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaClock className="mr-2 text-white" />
                    Added:{moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" />
                    Reviews:{product?.data?.numReviews}
                  </h1>
                </div>
                <div className="two">
                  <h1 className="flex  items-center mb-6">
                    <FaStar className="mr-2 text-white " /> Ratings:{rating}
                  </h1>
                  <h1 className="flex  items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white " /> Quantify:
                    {product?.data?.quantity}
                  </h1>
                  <h1 className="flex  items-center mb-6">
                    <FaBox className="mr-2 text-white " /> In Stock:{" "}
                    {product?.data?.countInStock}
                  </h1>
                </div>
              </div>
 



              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product?.data?.rating}
                  text={`${product?.data?.numReviews} Reviews`}
                  
                />
                {product?.data?.countInStock > 0 && (
                  <div className="">
                    <select
                      name="qty"
                      id="qty"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {"Quantity"}{" "}
                      {[...Array(product?.data?.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>
              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product?.data?.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0 hover:shadow-[0_0_20px_crimson] hover:duration-200 "
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
