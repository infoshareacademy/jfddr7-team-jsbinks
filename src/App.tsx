import React, {useEffect, useContext} from 'react';
import './App.css';
import { SignUp } from './components/Signup/Signup';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { SignIn } from './components/SignIn/SignIn';
import { MainView } from './components/MainView';
import {query, where, getDocs, collection} from 'firebase/firestore';
import { firebaseAuth, firebaseDb } from './index';
import { onAuthStateChanged } from 'firebase/auth';
import ProtectedRoutes from './components/ProtectedRoutes';
import { StoreContext } from './StoreProvider';

function App() {
  const navigate = useNavigate();
  // const [login, setLogin] = useState('');
  const {username, setUsername, setOperation} = useContext(StoreContext)


  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setUsername(userEmail || '');
      try {
        const operation: {
          amount: number,
          category: string,
          type: string,
          date: string,
        }[] = [];
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
    }
  })
  }, [setOperation, setUsername]);

  useEffect((): void => {
    if(username) {
      navigate('/wallet');
    } else {
      navigate('/signin');
    }
  }, [username]);

  return (
    <Routes>
       <Route path='signup' element={<SignUp/>} />
       <Route path='signin' element={<SignIn/>} />
       <Route element={<ProtectedRoutes/>}>
        <Route path='wallet' element={<MainView/>} />
       </Route>
       
    </Routes>
   
  );
}

export default App;
