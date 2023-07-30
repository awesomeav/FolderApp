import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="">
      <Button
        className=" absolute right-3 bg-blue-500"
        label="logout"
        onClick={logout}
      />
    </div>
  );
};

export default Home;
