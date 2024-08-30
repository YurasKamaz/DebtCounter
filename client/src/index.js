import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DebtorsStore from './store/DebtorsStore';
import DebtsStore from './store/DebtsStore';
import userStore from './store/UserStore';
import { QueryClient, QueryClientProvider } from 'react-query';

export const Context = createContext(null)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      placeholderData: (previousData) => previousData,
    },
  },
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <Context.Provider value = {{
        user: userStore,
        debtors: new DebtorsStore(),
        debts: new DebtsStore()
      }}>
        <App />
      </Context.Provider>
    </QueryClientProvider>
);

{/* <React.StrictMode></React.StrictMode> */}