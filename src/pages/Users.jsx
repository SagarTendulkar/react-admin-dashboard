import { users } from "../data/users";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useEffect, useMemo, useState } from "react";
import usePagination from "../hooks/usePagination";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { hasPermission, PERMISSIONS } from "../utils/utils/roles";
import { toast } from "react-toastify";
import { sortData } from "../utils/utils/sortingData";

const Users = () => {
  const [userData, setUserData] = useState(users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const sortedUsers = useMemo(() => {
    return sortData(filteredUsers, sortField, sortDirection);
  }, [filteredUsers, sortField, sortDirection]);
  const {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(sortedUsers, rowsPerPage);

  const { authUser } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = userData.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredUsers(result);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, userData]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditOpen(true);
  };
  const handleSaveEdit = () => {
    const updatedUsers = userData.map((user) =>
      user.id === editingUser.id ? editingUser : user,
    );

    setUserData(updatedUsers);
    setIsEditOpen(false);
    setEditingUser(null);

    toast.success("User updated successfully");
  };

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedUsers = userData.filter((user) => user.id !== selectedUserId);

    setUserData(updatedUsers);
    setIsModalOpen(false);
    setSelectedUserId(null);

    toast.success("User deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Users
        </h1>
        <Input
          className="w-64"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <table className="w-full table-fixed text-sm border-separate border-spacing-0">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider dark:bg-slate-800 dark:text-gray-300">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="py-3 px-4 w-1/4 text-left font-semibold cursor-pointer "
              >
                Name{" "}
                {sortField === "name"
                  ? sortDirection === "asc"
                    ? "▲"
                    : "▼"
                  : "⇅"}
              </th>
              <th
                onClick={() => handleSort("email")}
                className="py-3 px-4 w-1/4 text-left font-semibold cursor-pointer"
              >
                Email{" "}
                {sortField === "email" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("role")}
                className="py-3 px-4 text-left font-semibold cursor-pointer"
              >
                Role{" "}
                {sortField === "role" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("status")}
                className="py-3 px-4 text-left font-semibold cursor-pointer"
              >
                Status{" "}
                {sortField === "status" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              {hasPermission(authUser.role, PERMISSIONS.EDIT_USER) && (
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedData.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700 dark:text-gray-100">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700 dark:text-gray-100">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700 dark:text-gray-100">
                    {user.role}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700">
                    <Badge status={user.status} />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100 dark:border-slate-700">
                    <div className="flex gap-2">
                      {hasPermission(authUser.role, PERMISSIONS.EDIT_USER) && (
                        <Button
                          variant="secondary"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </Button>
                      )}
                      {hasPermission(
                        authUser.role,
                        PERMISSIONS.DELETE_USER,
                      ) && (
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteClick(user.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border dark:border-slate-700 dark:text-gray-100 dark:hover:bg-slate-700 ${
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "border dark:border-slate-700 dark:text-gray-100 dark:hover:bg-slate-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border dark:border-slate-700 dark:text-gray-100 dark:hover:bg-slate-700 ${
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
          <div className="flex justify-end items-center gap-2 text-sm dark:text-gray-100">
            <span>Rows per page:</span>

            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </Card>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
          Edit User
        </h2>

        <div className="space-y-4">
          <Input
            label="Name"
            value={editingUser?.name || ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />

          <Input label="Email" value={editingUser?.email || ""} disabled />

          <select
            className="border rounded-lg px-3 py-2 w-full dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            value={editingUser?.role || ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2 w-full dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700"
            value={editingUser?.status || ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, status: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSaveEdit}>Save</Button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-3 dark:text-gray-100">
          Delete User
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
