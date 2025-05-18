import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import { Message } from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slideToShow: 1,
    slideToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  return (
    <div className="mt-7 mb-4 xl:block lg:block md:block sm:hidden">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message
            ? error?.data?.message || error.message
            : "ERROR!!"}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[40rem] lg:ml-[5rem] xl:ml-[0rem]  md:ml-[5rem]  sm:w-[40rem] sm:hidden border-none outline-none"
        >
          {products?.data.map(
            ({
              image,
              _id,
              name: productName,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={productName}
                  className="w-full rounded-lg object-cover h-[31.5rem]"
                />
                <div className="flex justify-between w-[20rem] p-3 text-white">
                  <div className="one justify-between w-full">
                    <h2 className="text-2xl capitalize">{productName}</h2>
                    <h3 className="text-xl">₹{price}</h3>
                    <br />
                    <br />
                    <br />
                    <p className="w-[25rem] mt-[20px]">
                      {description.substring(0, 170)}...
                    </p>
                  </div>
                  <div className="flex justify-between  w-[20rem] p-3 text-white">
                    <div className="one ">
                      <h2 className="flex items-center  mb-6 w-[10rem]">
                        <FaStore className="mr-2 text-white mt-1" />
                        Brand: {brand}
                      </h2>
                      <h2 className="flex items-center  mb-6 w-[13rem]">
                        <FaClock className="mr-2 text-white mt-1" />
                        Created: {moment(createdAt).fromNow()}
                      </h2>
                      <h2 className="flex items-center  mb-6 w-[10rem]">
                        <FaStar className="mr-2 text-white mt-1" />
                        Reviews: {numReviews}
                      </h2>
                    </div>
                    <div className="two flex items-center flex-col">
                      <h1 className="flex item-center mb-6 w-[10rem]">
                        <FaStar className="mr-2 text-white mt-1" /> Ratings:
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex item-center mb-6 w-[10rem]">
                        <FaShoppingCart className="mr-2 text-white mt-1" />
                        Quantity:{quantity}
                      </h1>
                      <h1 className="flex item-center mb-6 w-[10rem]">
                        <FaBox className="mr-2 text-white  mt-1" /> In Stock:
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
