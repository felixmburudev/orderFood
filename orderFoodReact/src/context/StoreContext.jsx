/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import cartService from './cartService';

// Creating the context
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Context Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    

    fetchInitialCartData();
  }, []);

  const fetchInitialCartData = async () => {
    try {
      const userCart = await cartService.getUserCart();
      // setCartItems([...cartItems, {userCart}]);
      setCartItems(userCart);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };


  // add item to the cart
  const addToCart = async (item) => {
    try {
      const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.item_id === item.item_id);
    

      if (existingItemIndex !== -1) {
       const updatedCart = [...cartItems.slice(0, existingItemIndex),
          {
            ...cartItems[existingItemIndex], quantity: cartItems[existingItemIndex].quantity +1
          },
        ...cartItems.slice(existingItemIndex +1)];
        cartService.updateCartItem(item.item_id,cartItems[existingItemIndex].quantity + 1)
        setCartItems(updatedCart);
       } else{
       cartService.addToCart(item);
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    } }catch (error) {
      console.log('Error adding item to cart:  ', error);
    }
  };

  // increase quantity of an item in the cart
  const increaseQuantity = async (item) => {
    try {
      cartService.updateCartItem(item.item_id, item.quantity + 1 );
      const updatedCart = cartItems.map((itemC) =>
        itemC.item_id === item.item_id ? { ...itemC, quantity: item.quantity + 1 } : itemC
      );
      setCartItems(updatedCart);
    } catch (error) {
      console.log('Error increasing item quantity: ', error);
    }
  };

  // reduce quantity of an item in the cart
  const reduceQuantity = async (item) => {
    try {
      cartService.updateCartItem(item.item_id, item.quantity -1);
      const updatedCart = cartItems.map((itemc) =>
        itemc.item_id === item.item_id && itemc.quantity > 1 ? { ...itemc, quantity: item.quantity - 1 } : itemc
      );
      setCartItems(updatedCart);
    } catch (error) {
      console.log('Error reducing item quantity:' , error);
    }
  };
  const removeItem = async(item) =>{
    try{
      const updateCart = cartItems.filter(itemD=> itemD.item_id !== item.item_id)
      cartService.deleteCartItem(item.item_id)
      setCartItems(updateCart)

    }
    catch(error){
      console.log("error while removing from cart ", error)
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, reduceQuantity , removeItem}}>
      {children}
    </CartContext.Provider>
  );
};








