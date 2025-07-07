import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const ProductCard = ({
  id,
  name,
  description,
  image,
  price,
  originalPrice,
  action,
  onAdd,
  onRemove,
  onEdit,
  onDelete,
  collectionName,
}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((ci) => ci.productId === id);
  const cartCount = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    console.log('image url is', image.slice('AWS_URL='.length));
  }, [image]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="m-auto w-1/6 mt-3 min-w-52 rounded overflow-hidden shadow-lg bg-white p-2 text-center"
    >
      <img
        className="w-full h-52 object-cover"
        src={image.slice('AWS_URL='.length)}
        alt={name}
        loading="lazy"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl h-12 mb-2">{name}</div>
        <p className="text-gray-700 h-20 text-base">{description}</p>
        {price && (
          <div className="mt-2 text-lg text-green-600 font-semibold">
            {price} IQD
            {originalPrice && (
              <span className="text-sm text-red-500 line-through ml-2">
                {originalPrice} IQD
              </span>
            )}
          </div>
        )}
      </div>

      <div className="m-auto pb-2">
        {action === 'delete' && (
          <button
            className="bg-red-700 hover:opacity-90 active:opacity-80 text-white font-bold py-2 px-4 rounded"
            onClick={() => onDelete?.(collectionName, id)}
          >
            Delete {collectionName}
          </button>
        )}

        {action === 'edit' && (
          <button
            className="bg-secondary hover:opacity-90 active:opacity-80 text-white font-bold py-2 px-4 rounded"
            onClick={() => onEdit?.(collectionName, id)}
          >
            Edit
          </button>
        )}

        {action === 'add' && cartCount === 0 && (
          <button
            className="bg-secondary hover:opacity-90 active:opacity-80 text-white font-bold py-2 px-4 rounded"
            onClick={() => onAdd()}
          >
            Add to Cart
          </button>
        )}

        {action === 'add' && cartCount > 0 && (
          <div className="controls flex justify-around items-center">
            <span
              onClick={onRemove}
              className="bg-primary rounded-full text-tertiary w-9 h-9 flex items-center justify-center cursor-pointer font-bold text-xl"
            >
              -
            </span>
            <span className="text-secondary font-semibold">{cartCount}</span>
            <span
              onClick={onAdd}
              className="bg-primary rounded-full text-tertiary w-9 h-9 flex items-center justify-center cursor-pointer font-bold text-xl"
            >
              +
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  action: PropTypes.oneOf(['add', 'edit', 'delete']).isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  collectionName: PropTypes.string,
};

export default ProductCard;
