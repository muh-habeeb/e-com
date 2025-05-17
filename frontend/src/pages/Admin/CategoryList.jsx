import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  // useGetCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { CategoryForm } from "../../components/CategoryForm";
import Model from "../../components/Model";
const CategoryList = () => {
  //mutations idkn
  const { data: categories } = useFetchCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  //satess
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState(null);
  const [ModelVisible, setModelVisible] = useState(false);

  //functions
  //create
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name: name }).unwrap();

      if (result?.error) {
        toast.error(result?.error);
      } else {
        setName("");
        toast.success(`${result?.data?.name} is created.`);
      }
    } catch (error) {
      toast.error(`creating category failed. ${error?.data?.MESSAGE}`);
    }
  };

  //update
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.warn("Category name required!");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result?.data?.name} updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModelVisible(false);
      }
    } catch (error) {
      toast.error("Category Updating failed");
      console.log(error);
    }
  };

  //delete

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result?.error) {
        toast.error(result?.error);
      } else {
        toast.success(`${result?.data?.name} Deleted.`);
        setSelectedCategory(null);
        setModelVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("category deletion failed,try again");
    }
  };

  return (
    <div className="ml-[3.4rem] md:ml-[3.4rem] lg:ml-[5rem] xl:ml-[10rem] flex flex-col md:flex-row text-white">
      {/* admin menu */}
      <div className="md:w-3/4 p-3">
        <div className="h-12 mt-9 mb-3 text-2xl capitalize">
          {" "}
          Manage categories
        </div>

        <CategoryForm
          value={name}
          setaValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.data?.map((category) => (
            <div key={category._id}>
              <button
                onClick={() => {
                  setModelVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Model isOpen={ModelVisible} onClose={() => setModelVisible(false)}>
          <CategoryForm
            value={updatingName}
            setaValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Model>
      </div>
    </div>
  );
};

export default CategoryList;
