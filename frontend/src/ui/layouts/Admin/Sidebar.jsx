import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  setSelectedTab,
  setStockOperation,
  setProductData,
  setProductIsChosen,
  setImagePreview,
} from '../../../core/redux/AdminStockSlice/AdminStockSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.adminStock.selectedTab);
  const operation = useSelector((state) => state.adminStock.stock.operation);

  const [stockOpen, setStockOpen] = useState(true);

  const handleToggle = (tab) => {
    dispatch(setSelectedTab(tab));
    dispatch(setImagePreview(null));
    dispatch(setProductData({}));
    dispatch(setProductIsChosen(false));
  };

  const handleStockOp = (op) => {
    dispatch(setStockOperation(op));
    dispatch(setProductData({}));
    dispatch(setProductIsChosen(false));
  };

  return (
    <div className="w-full sm:w-1/5 sm:border-r-2 border-primary flex flex-col">
      <div className="ml-4 mt-2">
        <span
          className="cursor-pointer font-bold"
          onClick={() => {
            setStockOpen(!stockOpen);
            handleToggle('stock');
          }}
        >
          Manage Stock
          <span
            className={`font-thin text-xs ml-1 transition-transform duration-300 ${
              stockOpen ? 'rotate-180' : ''
            }`}
          >
            ▼
          </span>
        </span>

        <AnimatePresence initial={false}>
          {stockOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-5 w-3/5 border-l border-l-gray-100 overflow-hidden"
            >
              {['add', 'edit', 'delete'].map((op) => (
                <li
                  key={op}
                  className={`pl-2 py-1 cursor-pointer capitalize ${
                    operation === op ? 'text-secondary' : ''
                  }`}
                  onClick={() => handleStockOp(op)}
                >
                  {op} Item
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;
