import React, {useEffect, useContext, useState} from 'react';
import './App.css';
import { SignUp } from './components/Signup/Signup';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import { MainView } from './components/Main/MainView';
import NotFound from './components/NotFound';
import {query, where, getDocs, collection} from 'firebase/firestore';
import { firebaseAuth, firebaseDb } from './index';
import { onAuthStateChanged } from 'firebase/auth';
import ProtectedRoutes from './components/ProtectedRoutes';
import { StoreContext, OperationObj } from './StoreProvider';
import { NavigateBefore } from '@mui/icons-material';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const {username, setUsername, setOperation} = useContext(StoreContext)
  const [isAppInit, setIsAppInit] = useState<boolean>(false);


  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      setIsAppInit(true);
      if (user) {
        const userEmail = user.email;
        setUsername(userEmail || '');
      try {
        const operation: OperationObj[] = [];
        const q = query(collection(firebaseDb, 'operations'), where('userEmail', '==', userEmail));
        const operationsSnapshot = await getDocs(q);
        operationsSnapshot.forEach((operate) => {
          const {name: singleOperation} = operate.data();
          operation.push(singleOperation);
        });
        setOperation(operation)
        } catch (error) {
          console.log(error);
        }
    } else {
      setUsername('');
      setOperation([]);
      navigate('/signin');
    }
  })
  }, [setOperation, setUsername]);

  useEffect(()=> {
    if (!isAppInit || !username) {
      return
    }
    if (['/signin', '/signup'].includes(location.pathname)) {
      navigate('/wallet');
    }
  }, [username, isAppInit])

  return (
    <Routes>
      {isAppInit &&
      <>
      <Route path='signup' element={<SignUp/>} />
       <Route path='signin' element={<SignIn/>} />
       {/* <Route element={<ProtectedRoutes/>}> */}
        <Route path='wallet' element={<MainView/>} />
        <Route path="/" element={<Navigate to='/wallet'/>}/>
       {/* </Route> */}
       <Route path='*' element={<NotFound/>}></Route>
      </>
      }
    </Routes>
  );
}

export default App;
