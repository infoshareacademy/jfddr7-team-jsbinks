import React from 'react';
import ReactDOM from 'react-dom/client';
import { firebaseConfig } from './firebase';
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import './index.css';
import App from './App';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './StoreProvider';


const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter> 
  </React.StrictMode>
);


