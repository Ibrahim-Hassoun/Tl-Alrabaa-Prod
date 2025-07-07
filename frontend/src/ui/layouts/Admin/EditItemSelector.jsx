import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request from '../../../lib/remote/axios';
import {
  setProductData,
  setProductIsChosen,
} from '../../../core/redux/AdminStockSlice/AdminStockSlice';

const EditItemSelector = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.adminStock.stock.category);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await request({
        method: 'GET',
        route: `/api/products?category=${category}`,
      });
      if (res.success) setItems(res.data || []);
    };

    fetchItems();
  }, [category]);

  const handleClick = (item) => {
    dispatch(setProductData(item));
    dispatch(setProductIsChosen(true));
  };

  return (
    <div className="p-4 flex flex-wrap gap-4">
      {items.length === 0 ? (
        <p>No items found in this category.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="w-48 p-2 border border-primary rounded cursor-pointer hover:shadow-md transition"
            onClick={() => handleClick(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-full object-cover rounded"
            />
            <p className="font-bold mt-2 truncate">{item.name}</p>
            <p className="text-sm text-gray-500">{item.price} IQD</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EditItemSelector;
