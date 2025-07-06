import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart,decrementItemQuantity } from '../../../core/redux/CartSlice/CartSlice';
import request from '../../../lib/remote/axios';

const CartItem = ({ id, name, image, price, quantity, collectionName }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const baseURL = import.meta.env.VITE_URL;

  const handleAdd = async () => {
    dispatch(addToCart({ productId: id, quantity: 1 }));

    if (isLoggedIn) {
      await request({
        method: 'POST',
        route: '/api/cart',
        body: { product_id: id, quantity: 1 },
      });
    }
  };

  const handleRemove = async () => {
    dispatch(decrementItemQuantity(id));

    if (isLoggedIn) {
      await request({
        method: 'POST',
        route: '/api/cart/remove',
        body: { product_id: id, quantity: 1 }, // adjust route/logic per backend
      });
    }
  };

  return (
    <div className="w-full h-20 flex border border-gray-200">
      <div className="title w-1/4 border-r border-gray-200 flex">
        <div className="image-cotainer w-1/2 my-auto">
          <img
            src={`${baseURL}/images/${image}`}
            alt="item"
            className="m-auto h-16"
          />
        </div>
        <h1 className="m-auto font-extrabold capitalize text-primary">{name}</h1>
      </div>

      <div className="price w-1/4 border-r border-gray-200 flex">
        <h1 className="m-auto">{price}</h1>
      </div>

      <div className="quantity w-1/4 border-r border-gray-200 flex">
        <h1 className="m-auto flex justify-between items-start w-full">
          <div
            className="bg-primary h-5 w-5 text-tertiary rounded-full m-auto font-extrabold text-xs cursor-pointer"
            onClick={handleRemove}
          >
            -
          </div>
          {quantity}
          <div
            className="bg-primary h-5 w-5 text-tertiary rounded-full m-auto font-extrabold text-xs cursor-pointer"
            onClick={handleAdd}
          >
            +
          </div>
        </h1>
      </div>

      <div className="total w-1/4 border-r border-gray-200 flex">
        <h1 className="m-auto">{price * quantity}</h1>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default CartItem;
