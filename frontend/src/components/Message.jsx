export const Message = ({ variant, children }) => {
  const getVariant = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-800";
      case "error":
      case "danger":
        return "bg-red-100 text-red-800";
      default:
        "bg-blue-100 text-blue-800";
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className={`p-4 rounded ${getVariant()}`}>{children}</div>
    </div>
  );
};
