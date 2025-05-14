import { FaTimes } from "react-icons/fa";
import {} from "react-icons/io";
const Model = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-4 rounded z-10">
            <button
              className=" text-black text-2xl float-end px-1 py-3 font-semibold hover:text-gray-700 focus:outline-none mr-2 "
              onClick={onClose}
            >
              <FaTimes />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
