import React from 'react';
import { logoutUser } from '../api/api';
import { useNavigate } from 'react-router';
import UsersTable from '../components/UsersTable';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="page min-h-screen flex items-center justify-center from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-4xl flex flex-col justify-between items-center mb-6">
        <h1 className="font-bold mb-6">User Management</h1>
        <UsersTable />
        <button
          className="mt-4 p-2"
          onClick={() => {
            logoutUser();
            navigate('/auth');
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default HomePage;
