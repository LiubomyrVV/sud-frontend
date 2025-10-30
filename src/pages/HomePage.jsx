import React from 'react';
import { logoutUser } from '../api/api';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>HomePage</div>
      <button
        onClick={() => {
          logoutUser();
          navigate('/auth');
        }}
      >
        LOGOUT
      </button>
    </>
  );
};

export default HomePage;
