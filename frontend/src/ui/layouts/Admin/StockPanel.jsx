import React from 'react';
import { useSelector } from 'react-redux';
import AddItemForm from './AddItemForm';
import EditItemSelector from './EditItemSelector';
import EditItemForm from './EditItemForm';


const StockPanel = () => {
  const { operation, productIsChosen } = useSelector(
    (state) => state.adminStock.stock
  );

  if (!operation) {
    return <h1 className="p-4">Please select an operation</h1>;
  }

  if (operation === 'add') return <AddItemForm />;

  if (operation === 'edit') {
    return productIsChosen ? <EditItemForm /> : <EditItemSelector />;
  }


  return null;
};

export default StockPanel;
