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
import AdminMenu from "./components/AdminMenu";
const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [editableUserIsAdmin, setEditableUserIsAdmin] = useState(false);

  //update data hndle  i think
  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
        isAdmin: editableUserIsAdmin,
      }); //passing data as object

      setEditableUserId(null);
      refetch(); //what  it do

      toast.success("User Updated");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  // enable edit
  const toggleEdit = (id, username, email, isAdmin) => {
    setEditableUserId(id); //set the id
    setEditableUserName(username); //set the username
    setEditableUserEmail(email); //set email
    setEditableUserIsAdmin(isAdmin); //set admin or not
  };

  ///delete user
  const deleteHandler = async (id) => {
    let deleteConfirmation = window.confirm("Are you sure want to delete?");
    if (deleteConfirmation) {
      try {
        await deleteUser(id);
        toast.success("User Removed");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    } else {
      return toast.info("User Not Deleted");
    }
  };
  //waht hapening
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="ml-10 h-[100%]  w-full flex flex-col items-center justify-center bg-slate-900 sm:ml-[50px] mx-auto my-auto ">
      <h1 className="text-2xl font-semibold mb-4 text-white ">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message
            ? error?.data?.message || error.message
            : "Error while fetching Data"}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row text-white w-full">
          <AdminMenu />
          <table className="w-full md:w-4/5 mx-auto  border-collapse  border">
            <thead>
              <tr className="border">
                <th className="px-4 py-2 text-CENTER border">Sl.NO</th>
                <th className="px-4 py-2 text-CENTER border">USER ID</th>
                <th className="px-4 py-2 text-CENTER border">NAME</th>
                <th className="px-4 py-2 text-CENTER border">EMAIL</th>
                <th className="px-4 py-2 text-CENTER border">ADMIN</th>
                <th className="px-4 py-2 text-CENTER border">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.users.map((user, index) => (
                <tr key={user._id} className="border">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{user._id}</td>
                  <td className="px-4 py-2 border">
                    {editableUserId === user._id ? (
                      <div className="flex item-center">
                        <input
                          type="text"
                          value={editableUserName}
                          id="editableUserName"
                          name="editableUserName"
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="lg:min-w-[250px] w-full p-2 border rounded-lg bg-transparent"
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
                            toggleEdit(
                              user._id,
                              user.username,
                              user.email,
                              user.isAdmin
                            )
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
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="lg:min-w-[250px] w-full p-2 border rounded-lg bg-transparent"
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
                            toggleEdit(
                              user._id,
                              user.username,
                              user.email,
                              user.isAdmin
                            )
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py2 border ">
                    {editableUserId === user._id ? (
                      <input
                        type="checkbox"
                        className="size-5"
                        checked={editableUserIsAdmin}
                        onChange={(e) =>
                          setEditableUserIsAdmin(e.target.checked)
                        }
                      />
                    ) : user.isAdmin ? (
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

export default UserList;
