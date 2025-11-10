import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/api';
import { notify } from '../utils/toastify';
import ConfirmDialog from './UI/AlertDialog';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirm, setConfirm] = useState({
    open: false,
    message: '',
    action: null,
  });

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
  const handleUpdate = async (id) => {
    const res = await deleteUser(id);
    if (res.status === 200) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      notify('success', 'User deleted successfully');
    } else {
      notify('error', res.message || 'Failed to delete user');
    }
  };

  const openConfirm = (message, action) => {
    setConfirm({ open: true, message, action });
  };

  const handleConfirm = () => {
    if (confirm.action) confirm.action();
    setConfirm((prev) => ({ ...prev, open: false }));
  };

  const handleClose = () => {
    notify('info', 'Action cancelled');
    setConfirm((prev) => ({ ...prev, open: false }));
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
                <td className="px-5 py-3 text-center align-middle">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <button
                      onClick={() =>
                        openConfirm(
                          'Are you sure you want to delete this user?',
                          () => handleDelete(user.id)
                        )
                      }
                      className="p-1 text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        openConfirm(
                          'Are you sure you want to update this user?',
                          () => handleUpdate(user.id)
                        )
                      }
                      className="p-1 text-blue-600 hover:underline"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ConfirmDialog
        open={confirm.open}
        title="Confirmation"
        message={confirm.message}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </div>
  );
}
