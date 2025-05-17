import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Auth/navigation.css";
import {
  // useAllProductQuery, //all
  // useGetProductsQuery, //get product 6
  useGetProductByIdQuery, //get by id
  // useGetProductDetailsQuery, //get product details
  useUpdateProductMutation, //update
  useDeleteProductMutation, //delete
  // useCreateReviewMutation, //review
  // useGetTopProductsQuery, //top
  // useGetNewProductsQuery, //new
  useUploadProductImageMutation, //image upload
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./components/AdminMenu";
const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);
  const [imageName, setImageName] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || 0);
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || 0);
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.stock || 0);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [uploadProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setImageName(productData.imageName);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setStock(productData.stock);
      setName(productData.name);
    }
  }, [productData]);

  const handleSubmit = () => {};

  return (
    <>
      <div className="">
        <AdminMenu />
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl  ml-[1rem] p-4 sm:p-6 bg-gray-900 sm:ml-[3rem] rounded-l  lg:mx-auto "
      >
        {/* 🖼️ Image Preview */}
        {/* {imageUrl && (
          <div className="mb-4 text-center rounded-lg ">
            <img
              src={imageUrl}
              alt="Uploaded product Image"
              className="inline-block object-cover h-72 w-80 rounded-lg "
            />
          </div>
        )} */}
        <label
          htmlFor="image"
          className="block mb-4 cursor-pointer border rounded-lg p-8 text-center text-white font-bold bg-gray-800 hover:bg-gray-700"
          style={{
            display: "block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {imageName || "Upload Image"}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            // onChange={uploadFileHandler}
            className="hidden "
          />
        </label>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <div className="flex-1 mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-white font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded bg-transparent border border-gray-600 text-white"
              placeholder="Product name"
            />
          </div>

          <div className="flex-1 mb-4">
            <label
              htmlFor="price"
              className="block mb-2 text-white font-semibold"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-4 rounded bg-transparent border border-gray-600 text-white"
              placeholder="Product price"
            />
          </div>
        </div>

        {/* 📝 Other fields: Description, Category, Quantity, Brand, Stock */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-white font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            rows={2}
            required
            className="w-full p-4 rounded bg-transparent border border-gray-600 text-white max-h-[450px] resize-none"
            placeholder="Enter product description"
          />
        </div>
        {/*Category, Quantity, Brand, Stock */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="category"
              className="block mb-2 text-white font-semibold"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-4 rounded bg-transparent border border-gray-600 text-white"
            >
              <option value="" disabled>
                {"Select Category"}
              </option>
              {categories?.data?.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="capitalize bg-gray-900"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="quantity"
              className="block mb-2 text-white font-semibold"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="w-full p-4 rounded bg-transparent border border-gray-600 text-white"
              placeholder="Enter quantity"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label
              htmlFor="brand"
              className="block mb-2 text-white font-semibold"
            >
              Brand
            </label>
            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-4 rounded bg-transparent border border-gray-600 text-white"
              placeholder="Enter brand"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="stock"
              className="block mb-2 text-white font-semibold"
            >
              Stock Count
            </label>
            <input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
              className="w-full p-4 rounded bg-transparent border border-gray-600 text-white"
              placeholder="Enter stock count"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full py-3 rounded bold bg-pink-600 hover:bg-pink-500 duration-300 text-white font-bold tracking-[1.4px]"
        >
          {"Create Product"}
        </button>
      </form>
    </>
  );
};

export default ProductUpdate;
