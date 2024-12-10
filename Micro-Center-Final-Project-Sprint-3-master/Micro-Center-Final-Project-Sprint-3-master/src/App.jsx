import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';  // Import the Nav component

function App() {
  return (
    <div>
      <Nav />  


      <Outlet />
    </div>
  );
}

export default App;
