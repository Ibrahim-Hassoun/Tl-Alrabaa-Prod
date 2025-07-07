import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart, decrementItemQuantity } from '../../../core/redux/CartSlice/CartSlice';

const CartItem = ({ id, name, image, price, quantity }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  const handleRemove = () => {
    dispatch(decrementItemQuantity(id));
  };

  return (
    <div className="w-full h-20 flex border border-gray-200">
      <div className="title w-1/4 border-r border-gray-200 flex">
        <div className="image-container w-1/2 my-auto">
          <img
            src={image.slice('AWS_URL='.length)}
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
        <div className="m-auto flex justify-between items-center w-full px-4">
          <div
            className="bg-primary h-6 w-6 text-tertiary rounded-full font-extrabold text-xs flex items-center justify-center cursor-pointer"
            onClick={handleRemove}
          >
            -
          </div>

          <span className="font-semibold text-secondary">{quantity}</span>

          <div
            className="bg-primary h-6 w-6 text-tertiary rounded-full font-extrabold text-xs flex items-center justify-center cursor-pointer"
            onClick={handleAdd}
          >
            +
          </div>
        </div>
      </div>

      <div className="total w-1/4 border-r border-gray-200 flex">
        <h1 className="m-auto">{price * quantity}</h1>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  collectionName: PropTypes.string,
};

export default CartItem;
