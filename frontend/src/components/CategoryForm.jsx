

// CategoryForm Component
// This component is used for creating and updating categories
// Props:
// - value: current category name
// - setaValue: function to update category name
// - handleSubmit: form submission handler
// - buttonText: custom submit button text (defaults to "Submit")
// - handleDelete: optional delete handler

export const CategoryForm = ({
  value,
  setaValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="py-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full text-black"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setaValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:bg-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
