// in lib/helpers/loadUserCart.js or wherever you want
import request from '../../lib/remote/axios';
import { setCart } from '../../core/redux/CartSlice/CartSlice';

export const loadUserCart = async (dispatch) => {
    
  const res = await request({
    method: 'GET',
    route: '/cart',
  });
    console.log('Response from loadUserCart:', res);
  if (res.success && res.data) {
    console.log('Setting cart with data:', res.data);
    dispatch(setCart(res.data)); // res.data should be the array of items
    console.log('Cart loaded successfully');
  }
};
