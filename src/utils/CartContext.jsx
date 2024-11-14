import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();
const FavoriContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [favoriItems, setFavoriItems] = useState(() => {
        const savedFavori = localStorage.getItem('favoriItems');
        return savedFavori ? JSON.parse(savedFavori) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('favoriItems', JSON.stringify(favoriItems));
    }, [favoriItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const addToFavori = (item) => {
        setFavoriItems((prevItems) => [...prevItems, item]);
    };

    const removeFromFavori = (id) => {
        setFavoriItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const clearFavori = () => {
        setFavoriItems([]);
        localStorage.removeItem('favoriItems');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            <FavoriContext.Provider value={{ favoriItems, addToFavori, removeFromFavori, clearFavori }}>
                {children}
            </FavoriContext.Provider>
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
export const useFavori = () => useContext(FavoriContext);