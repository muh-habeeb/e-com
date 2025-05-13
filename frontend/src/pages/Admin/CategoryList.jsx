import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  // useGetCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGatAllCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { CategoryForm } from "../../components/CategoryForm";

const CategoryList = () => {
  //mutations idkn
  const { data: categories } = useGatAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  //satess
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState(null);
  const [ModelVisible, setModelVisible] = useState(false);

  //functions
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name: name }).unwrap();
      console.log(result);

      if (result?.error) {
        console.log(result.error);
        toast.error(result?.error);
      } else {
        setName("");
        toast.success(`${result?.data?.name} is created.`);
      }
    } catch (error) {
      toast.error(`creating category failed. ${error?.data?.MESSAGE}`);
    }
  };
  return (
    <div className="ml-[10rem] flex flex-col md:flex-row text-white">
      {/* admin menu */}
      <div className="md:w-3/4 p-3">
        <div className="h-12 mt-9 text-2xl "> Manage categories</div>

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
                  setUpdateName(category.name);
                }}
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
