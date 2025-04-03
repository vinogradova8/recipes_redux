import React from 'react';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className="bg-green-600 p-8">
      <Outlet />
    </div>
  );
};
