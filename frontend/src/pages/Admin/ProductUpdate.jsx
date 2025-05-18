import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Auth/navigation.css";
import {
  useGetProductByIdQuery, //get by id
  useUpdateProductMutation, //update
  useDeleteProductMutation, //delete
  useUploadProductImageMutation, //image upload
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./components/AdminMenu";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
const ProductUpdate = () => {
  const params = useParams(); // why
  // setting default vals
  const {
    data: productData,
    isLoading,
    isError,
    refetch, //reetfet not worikng
  } = useGetProductByIdQuery(params._id); //what?

  const [imageName, setImageName] = useState(productData?.data?.image || "");
  const [name, setName] = useState(productData?.data?.name || "");
  const [price, setPrice] = useState(productData?.data?.price || 0);
  const [description, setDescription] = useState(
    productData?.data?.description || ""
  );

  const [category, setCategory] = useState(productData?.data?.category || "");
  const [quantity, setQuantity] = useState(productData?.data?.quantity || 0);
  const [brand, setBrand] = useState(productData?.data?.brand || "");
  const [stock, setStock] = useState(productData?.data?.countInStock || 0);
  const [uploadedImageName, setUploadedImageName] = useState(null);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [uploadProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData?.data?._id) {
      setImageName(productData?.data?.image);
      setName(productData?.data?.name);
      setPrice(productData?.data?.price);
      setDescription(productData?.data?.description);
      setCategory(productData?.data?.category);
      setQuantity(productData?.data?.quantity);
      setBrand(productData?.data?.brand);
      setStock(productData?.data?.countInStock);
    }
  }, [productData, refetch]);

  // ====================================================================================
  // ====================================================================================

  if (isLoading) return <Loader />;
  if (isError)
    return <Message variant="danger">Error fetching products</Message>;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Exit if no file selected

    setUploadedImageName(file.name); // Show file name in UI

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("image", file);

    try {
      // 🔼 Upload image file to server
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image Updated successfully!");
      // 🖼️ Save image URL from server response
      const imgUrl = res.image.startsWith("/") ? res.image : `/${res.image}`;
      setImageName(imgUrl); //setting t he url to image name state
    } catch (error) {
      toast.error("File upload failed. Please try again.");
      console.error("Upload error:", error);
    }
  };

  //======================================================================================================================================
  //======================================================================================================================================
  // 📨 Handle form submit: send product data (with image URL) to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("image", imageName);
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("quantity", quantity);
      formdata.append("brand", brand);
      formdata.append("countInStock", stock);

      const result = await uploadProduct({
        productId: params._id,
        formData: formdata,
      });

      if (result?.error) {
        toast.error(`Updating Failed!. ${result?.error?.data?.error}`);
        console.log(result?.error?.data?.error || result?.error?.data?.message);
      } else {
        toast.success(`${result?.data?.data?.name} is updated`);
        console.log(result?.data?.MESSAGE);
        //navigate to home
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      toast.error("Product Update Failed!.Try Again.");
      console.log(error?.data?.message || error?.error);
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      let confirmation = window.confirm(
        "Are you want to delete this product? "
      );
      if (!confirmation) {
        return;
      } else {
        const data = await deleteProduct(params._id);
        toast.success(`${data?.data?.message} Successfully`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      toast.error("Product Deletion Failed!.Try Again.");
      console.log(error?.data?.message || error?.error);
      console.log(error);
    }
  };

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
        {imageName && (
          <div className="mb-4 text-center rounded-lg ">
            <img
              src={imageName}
              alt="Uploaded product Image"
              className="inline-block object-cover h-72 w-80 rounded-lg "
            />
          </div>
        )}
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
          {uploadedImageName || ""}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={uploadFileHandler}
            className={uploadedImageName ? "hidden" : "text-red-500"}
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

        {/*  Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-3 rounded bold bg-emerald-600 hover:bg-emerald-500 duration-300 text-white font-bold tracking-[1.4px]"
          >
            {"Update Product"}
          </button>
          <button
            onClick={handleDelete}
            type="submit"
            className="w-full py-3 rounded bold bg-pink-600 hover:bg-pink-500 duration-300 text-white font-bold tracking-[1.4px]"
          >
            {"Delete Product"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductUpdate;
