import React from 'react';
import Sidebar from './Sidebar';
import StockPanel from './StockPanel';
import { useSelector } from 'react-redux';

const AdminPanel = () => {
  const selectedTab = useSelector((state) => state.adminStock.selectedTab);

  return (
    <div className="min-h-screen bg-tertiary flex">
      <div className="containers pt-20 mx-auto flex flex-wrap w-full text-start">
        <Sidebar />
        <div className="right w-full sm:w-4/5">
          {selectedTab === 'stock' && <StockPanel />}
          {/* future: {selectedTab === 'orders' && <OrdersPanel />} */}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
