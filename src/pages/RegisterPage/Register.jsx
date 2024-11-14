import React from 'react';
import MainLayout from '../../layout/MainLayoutPage/MainLayout';
import Navbar from '../../components/navbar';
import RegisterForm from './pageComponents/RegisterForm/RegisterForm';
import { useLocation } from 'react-router-dom';
import { getRouteTitle } from '../../routing/routes';

function Register() {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  const handleFormFinish = (values) => {
    console.log(values);
  };

  return (
    <MainLayout content={<RegisterForm onFinish={handleFormFinish} />} header={<Navbar />} title={title} />
  );
}

export default Register;