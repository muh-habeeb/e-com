import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
export const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUsername, setEditableUsername] = useState("");
  const [editableUserEmail, setEditableUseremail] = useState("");
  const updateHandler = () => {
    console.log("clikde");
  };
  const toggleEdit = () => {
    console.log("clikd");
  };
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      try {
        const result = await deleteUser(id);
        console.log(result);
      } catch (error) {
        toast.error(error?.data?.message || error);
      }
    }
    console.log("deleted");
  };
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="p-4 text-white h-[100vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4  ">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {" "}
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* admin menu */}
          <table className="w-full md:w-4/5 mx-auto  border-collapse  border">
            <thead>
              <tr className="border">
                <th className="px-4 py-2 text-CENTER border">USER ID</th>
                <th className="px-4 py-2 text-CENTER border">NAME</th>
                <th className="px-4 py-2 text-CENTER border">EMAIL</th>
                <th className="px-4 py-2 text-CENTER border">ADMIN</th>
                <th className="px-4 py-2 text-CENTER border">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.users.map((user) => (
                <tr key={user._id} className="border">
                  <td className="px-4 py-2 border">{user._id}</td>
                  <td className="px-4 py-2 border">
                    {editableUserId === user._id ? (
                      <div className="flex item-center">
                        <input
                          type="text"
                          value={editableUsername}
                          id="editableUsername"
                          name="editableUsername"
                          onChange={(e) => setEditableUsername(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex item-center">
                        {" "}
                        {user.username}
                        {""}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py2 border">
                    {editableUserId === user._id ? (
                      <div className="flex item-center">
                        <input
                          type="text"
                          id="editableUserEmail"
                          name="editableUserEmail"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUseremail(e.target.value)}
                          className="w-full border rounded-lg "
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg "
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex item-center">
                        <p>{user.email}</p>

                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py2 border">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded py-2 px-4"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
