import React from 'react';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      <h1>Crypto-tracker</h1>
      <Outlet />
   </div>
  );
}

export default Root;
