import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/api';
import { notify } from '../utils/toastify';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users on mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUsers();
      if (res.status === 200) {
        setUsers(res.users || []);
      } else {
        notify('error', res.message || 'Failed to load users');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Delete user handler
  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    if (res.status === 200) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      notify('success', 'User deleted successfully');
    } else {
      notify('error', res.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500 text-sm">
        Loading users...
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 shadow-md">
      <table className="min-w-[60vw] text-sm text-left bg-white rounded-xl overflow-hidden">
        <thead className="bg-linear-to-r from-indigo-500 to-violet-500 text-white">
          <tr>
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Role</th>
            <th className="px-5 py-3 font-medium text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 h-[55vh]">
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="px-5 py-6 text-center text-gray-500 text-base"
              >
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-5 py-3">{user.name}</td>
                <td className="px-5 py-3">
                  {user.email ? (
                    user.email
                  ) : (
                    <span className="text-gray-400 italic">Access denied</span>
                  )}
                </td>
                <td className="px-5 py-3 capitalize">
                  {user.role || (
                    <span className="text-gray-400 italic">unknown</span>
                  )}
                </td>
                <td className="px-5 py-3 text-center">
                  <button onClick={() => handleDelete(user.id)} className="p-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
