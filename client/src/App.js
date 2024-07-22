import React, { useContext, useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/AppRouter';
import MainNavbar from './components/MainNavbar';
import { Context } from '.';
import { observer } from 'mobx-react-lite';

function App() {
  const {user} = useContext(Context)

  return (
    <BrowserRouter className="App">
      <MainNavbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default observer(App);
