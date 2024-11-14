import React from 'react';
import AppClientRouter from './AppClientRouter.jsx';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import { AuthProvider } from './utils/AuthContext';
import { CartProvider } from './utils/CartContext.jsx';

Amplify.configure(config);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppClientRouter />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;