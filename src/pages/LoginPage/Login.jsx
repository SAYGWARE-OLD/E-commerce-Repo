import React from 'react';
import MainLayout from '../../layout/MainLayoutPage/MainLayout';
import Navbar from '../../components/navbar';
import LoginForm from './pageComponents/LoginForm/LoginForm';
import { useLocation } from 'react-router-dom';
import { getRouteTitle } from '../../routing/routes';
import "./Login.css"

function Login() {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <MainLayout content={<LoginForm onFinish={handleFormSubmit} />} header={<Navbar />} title={title} />
  );
}

export default Login;