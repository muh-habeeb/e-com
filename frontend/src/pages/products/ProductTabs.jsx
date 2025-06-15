import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { FaTrashAlt } from "react-icons/fa";
const ProductTabs = ({
  loadingProductReview,
  userInfo,
  rating,
  setRating,
  comment,
  setComment,
  product,
  submitHandler, // FROM PRODUCT DETAILS
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const productData = data?.data; //better access for each product item
  const [activeTab, setActiveTab] = useState(1);
  if (isLoading) return <Loader />;
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // const deleteReview=(id)=>{
  // }
  return (
    <div className="flex flex-col md:flex-row text-white duration-300 transition-all ">
      <section className="mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg capitalize w-[15rem]${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write your review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg capitalize ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg capitalize ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          related products
        </div>
      </section>

      {/* second part */}

      <section>
        {activeTab === 1 && (
          <div className="mt4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="mt-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>
                  <select
                    name="rating"
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black "
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-white bg-transparent resize-none"
                  >
                    {" "}
                  </textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className=" capitalize">
                please{" "}
                <Link to="/login" className="underline">
                  {"Sign In"}
                </Link>{" "}
                {"to Write a review"}
              </p>
            )}
          </div>
        )}
      </section>
      <section>
        {activeTab === 2 && (
          <div className="">
            {product?.data?.reviews.length === 0 && (
              <p>{"No reviews available"}</p>
            )}
            <>
              <div>
                {product.data.reviews.map((review) => (
                  <div
                    className="bg-pink-900 p-4 rounded-lg  ml-[0rem] xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5 "
                    key={review._id}
                  >
                    <div className="flex justify-between">
                      <strong className="text-[#b0b0b0 capitalize tracking-wide">
                        {/* display the user name who created the review */}
                        {review.name}
                        {""}
                      </strong>
                      <p className="text-[#b0b0b0">
                        {/* show the  review created time */}
                        {moment(review.createdAt).format("DD - MMM - YY")}{" "}
                      </p>
                      {/* 

                      delete review by the posted user  and the admin
                      <FaTrashAlt onClick={deleteReview} />
                       */}
                    </div>
                    <div>
                      <div className="my-4">
                        {/* passing the product data to the rating component to get the  stars and comment */}
                        <Ratings value={review.rating} data={review.comment} />{" "}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </div>
        )}
      </section>

      <section>
        {activeTab === 3 && (
          <>
            <section className="ml-[4rem] flex flex-wrap">
              {!productData ? (
                <Loader />
              ) : (
                productData.map((PRODUCT) => (
                  <aside className="" key={PRODUCT._id} id={PRODUCT._id}>
                    {<SmallProduct product={PRODUCT} />}
                  </aside>
                ))
              )}
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
