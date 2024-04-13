import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
// import Router from './Router';

function Root() {
  return (
    <div>
      <Header />
      <Outlet /> 
    </div>
  );
}

export default Root;
