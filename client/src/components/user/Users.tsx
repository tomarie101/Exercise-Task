import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./UserModal";
import EditForm from "./EditForm";
import AddForm from "./AddForm";
import Pagination from "../article/Pagination";

type User = {
  id: number;
  name: string;
  email: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Get the current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fetch user by ID for viewing
  const fetchUserByIdForView = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${id}`);
      setSelectedUser(response.data);
      setIsEditModalOpen(false); // Ensure edit modal is closed
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Fetch user by ID for editing
  const fetchUserByIdForEdit = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${id}`);
      setSelectedUser(response.data);
      setIsEditModalOpen(true); // Open edit modal
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Delete user by ID
  const deleteUserById = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Remove deleted user from state
      setSelectedUser(null); // Clear selected user if deleted
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  // Close add modal
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Add user handler
  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  // Update user handler
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="users-container flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Add Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add User
          </button>
        </div>
        <div className="table-container mt-4 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-6">{user.name}</td>
                  <td className="py-2 px-6">{user.email}</td>
                  <td className="py-2 px-6 space-x-2">
                    <button
                      onClick={() => fetchUserByIdForView(user.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => fetchUserByIdForEdit(user.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUserById(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        postsPerPage={usersPerPage}
        totalPosts={users.length}
        paginate={paginate}
      />

      {/* View Modal */}
      {selectedUser && !isEditModalOpen && (
        <Modal isOpen={true} onClose={closeEditModal}>
          <div className="p-10">
            <h4 className="text-2xl font-semibold mb-4">Details</h4>
            <div>
              <p className="mb-2">
                <span className="font-medium">Name:</span> {selectedUser.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {selectedUser.email}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <EditForm
              user={selectedUser}
              onClose={closeEditModal}
              onUpdate={handleUpdateUser}
            />
          </div>
        </Modal>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Add User</h2>
            <AddForm onClose={closeAddModal} onAdd={handleAddUser} />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Users;
