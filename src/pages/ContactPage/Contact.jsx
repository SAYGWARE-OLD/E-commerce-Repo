import React from 'react';
import MainLayout from '../../layout/MainLayoutPage/MainLayout';
import Navbar from '../../components/navbar';
import ContactForm from './pageComponents/ContactForm/ContactForm';
import { useLocation } from 'react-router-dom';
import { getRouteTitle } from '../../routing/routes';

function Contact() {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
      <MainLayout content={<ContactForm onFinish={handleFormSubmit} />} header={<Navbar />} title={title} />
  );
}

export default Contact;