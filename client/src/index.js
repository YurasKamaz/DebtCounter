import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DebtorsStore from './store/DebtorsStore';
import DebtsStore from './store/DebtsStore';
import userStore from './store/UserStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <Context.Provider value = {{
      user: userStore,
      debtors: new DebtorsStore(),
      debts: new DebtsStore()
    }}>
      <App />
    </Context.Provider>
     
);

{/* <React.StrictMode></React.StrictMode> */}