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
  const[Changed, setChanged] =useState(false)

  useEffect(() => {
    

    fetchInitialCartData();
  }, [Changed]);

  const fetchInitialCartData = async () => {
    try {
      // Replace 'userId' with your actual user ID logic
      const userId = 'user123';
      const userCart = await cartService.getUserCart(userId);
      // setCartItems([...cartItems, {userCart}]);
      setCartItems(userCart);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };


  // Function to add item to the cart
  const addToCart = async (item) => {
    try {
      const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.item_id === item.item_id);
      // alert(cartItems[existingItemIndex].quantity)
    

      if (existingItemIndex !== -1) {
        // alert("item exits  " + item.name+ `${JSON.stringify(cartItems[existingItemIndex])}`)
       const updatedCart = [...cartItems.slice(0, existingItemIndex),
          {
            ...cartItems[existingItemIndex], quantity: cartItems[existingItemIndex].quantity +1
          },
        ...cartItems.slice(existingItemIndex +1)];
        cartService.updateCartItem(item.item_id,cartItems[existingItemIndex].quantity + 1)
        setCartItems(updatedCart);
        // alert(cartItems[existingItemIndex].quantity + 1)
       } else{
       cartService.addToCart(item);
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    } }catch (error) {
      alert('Error adding item to cart:  '+ error);
    }
  };

  // Function to increase quantity of an item in the cart
  const increaseQuantity = async (item) => {
    try {
      cartService.updateCartItem(item.item_id, item.quantity + 1 );
      const updatedCart = cartItems.map((itemC) =>
        itemC.item_id === item.item_id ? { ...itemC, quantity: item.quantity + 1 } : itemC
      );
      setCartItems(updatedCart);
    } catch (error) {
      alert('Error increasing item quantity: '+ error);
    }
  };

  // Function to reduce quantity of an item in the cart
  const reduceQuantity = async (item) => {
    try {
      // Reduce quantity via cartService
      cartService.updateCartItem(item.item_id, item.quantity -1);
      const updatedCart = cartItems.map((itemc) =>
        itemc.item_id === item.item_id && itemc.quantity > 1 ? { ...itemc, quantity: item.quantity - 1 } : itemc
      );
      setCartItems(updatedCart);
    } catch (error) {
      alert('Error reducing item quantity:' + error);
    }
  };
  const removeItem = async(item) =>{
    try{
      const updateCart = cartItems.filter(itemD=> itemD.item_id !== item.item_id)
      // alert("deleting "+item.item_id)
      cartService.deleteCartItem(item.item_id)
      setCartItems(updateCart)

    }
    catch(error){
      alert("error while removing from cart "+ error)
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, reduceQuantity , removeItem}}>
      {children}
    </CartContext.Provider>
  );
};












// /* eslint-disable react/prop-types */
// import { createContext, useState, useContext } from 'react';

// // Creating the context
// const CartContext = createContext();

// // Custom hook to access the context
// // eslint-disable-next-line react-refresh/only-export-components
// export const useCart = () => {
//     const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context
// };

// // Context Provider component
// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Function to add item to the cart
//   const addToCart = (item) => {
//     alert("adding " + item.id)
//     const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

//     if (existingItemIndex !== -1) {
//       const updatedCart = [...cartItems];
//       updatedCart[existingItemIndex].quantity += 1;
//       setCartItems(updatedCart);
//     } else {
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
//   };

//   // Function to increase quantity of an item in the cart
//   const increaseQuantity = (item.item_id) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCartItems(updatedCart);
//   };

//   // Function to reduce quantity of an item in the cart
//   const reduceQuantity = (itemId) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
//     );
//     setCartItems(updatedCart);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, reduceQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
