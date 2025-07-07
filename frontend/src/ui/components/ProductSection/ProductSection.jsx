import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';
import request from '../../../lib/remote/axios';
import { addToCart,decrementItemQuantity } from '../../../core/redux/CartSlice/CartSlice';
import { useDispatch } from 'react-redux';

const ProductSection = ({ id, title, category, renderSidebar }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  // Redux dispatch for adding items to cart
  const dispatch = useDispatch();
  const handleAdd = (item) => {
    dispatch(addToCart(item));
  };
  const handleRemove = (item) => {
    dispatch(decrementItemQuantity(item));
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ category, ...filters });
        const res = await axios.get(`http://127.0.0.1:8000/api/products?category=${category}`);
        setProducts(res.data.data.data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, filters]);

  return (
    <section id={id} className="mb-10">
      <div className="containers m-auto">
        <motion.h1
          className="text-primary text-6xl mt-3 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <hr className="bg-secondary h-1 w-4/6 mt-3 mx-auto mb-4" />

        <div className="main-table w-full flex flex-wrap">
          {renderSidebar && (
            <div className="w-full md:w-1/5 mb-5 md:mb-0">
              {renderSidebar({ filters, setFilters })}
            </div>
          )}

          <div className="list m-auto w-full md:w-4/5 flex flex-wrap gap-2 justify-center">
            {loading ? (
              <motion.p
                className="text-primary text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Loading...
              </motion.p>
            ) : error ? (
              <motion.p
                className="text-red-500 text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            ) : products.length === 0 ? (
              <motion.p
                className="text-primary text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No items found
              </motion.p>
            ) : (
              products.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  price={item.discount_price || item.price}
                  originalPrice={item.discount_price ? item.price : null}
                  onAdd={() => handleAdd({ productId: item.id, quantity: 1 })}
                  onRemove={() => handleRemove(item.id)}

                  action="add"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
