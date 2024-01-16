import axios from 'axios';

const API_URL = 'http://localhost:3000/cart';

const cartService = {
  addToCart: async (itemData) => {
    try {
      const response = await axios.post(`${API_URL}/add`, itemData,{
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  },

  updateCartItem: async (item_id, updatedQuantity) => {
    try {
      const response = await axios.put(`${API_URL}/update`, { item_id, updatedQuantity},{
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.log('Error updating cart item:' , error);
      throw new Error('Failed to update cart item');
    }
  },
  deleteCartItem: async(item_id)=>{
    try {
      const response = await axios.put(`${API_URL}/delete`, {item_id})
      return response.data
    } catch (error) {
      alert("failed to delete from the server " + error)
      
    }
  },
  

  getUserCart: async () => {
    try {
      const response = await axios.get(`${API_URL}/user`,{
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error getting user cart:', error);
      throw new Error('Failed to fetch user cart');
    }
  },
};

export default cartService;
