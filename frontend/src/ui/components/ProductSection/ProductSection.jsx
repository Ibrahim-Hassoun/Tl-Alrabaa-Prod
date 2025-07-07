import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard/ProductCard';
import request from '../../../lib/remote/axios';
import { addToCart, decrementItemQuantity } from '../../../core/redux/CartSlice/CartSlice';
import { useDispatch,useSelector } from 'react-redux';

const ProductSection = ({ id, title, category, renderSidebar }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

const handleAdd = async (item) => {
  dispatch(addToCart(item));
  if (auth.loggedIn) {
    const res = await request({
      method: 'post',
      route: '/cart/add',
      body: {
        product_id: item.productId,
        quantity: item.quantity,
      },
    });

    if (res.success) {
      // Optional: dispatch to update Redux cart with new data
      console.log('Item added to server cart');
    } else {
      console.error('Failed to add to server cart:', res.message);
    }
  } else {
    dispatch(addToCart(item));
  }
};
  const handleRemove = (item) => {
    dispatch(decrementItemQuantity(item));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const query = new URLSearchParams({ category, ...filters }).toString();
        const res = await request({
          method: 'get',
          route: `/products?${query}`,
        });

        if (!res.success) throw new Error(res.message);
        setProducts(res.data.data);
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
              <motion.p className="text-primary text-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Loading...
              </motion.p>
            ) : error ? (
              <motion.p className="text-red-500 text-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error}
              </motion.p>
            ) : products.length === 0 ? (
              <motion.p className="text-primary text-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
