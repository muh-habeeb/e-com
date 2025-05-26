import { useState } from "react";
import { Form, Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  rating,
  setRating,
  comment,
  setComment,
  product,
  submitHandler
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);
  if (isLoading) return <Loader />;

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

//   const submitHandler = async(e) => {
//     e.preventDefault();
//     try {
//         await creaet
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
        
//     }

//   };
  return (
    <div className="flex flex-col md:flex-row text-white duration-300 transition-all ">
      <section className="mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg capitalize ${
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
                  Sign In
                </Link>{" "}
                to Write a review
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
