import React, {useEffect, useState, useContext} from 'react';
import './App.css';
import { SignUp } from './components/Signup/Signup';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { SignIn } from './components/SignIn/SignIn';
import { MainView } from './components/MainView';
import { firebaseAuth } from './index';
import { onAuthStateChanged } from 'firebase/auth';
import ProtectedRoutes from './components/ProtectedRoutes';
import { StoreContext } from './StoreProvider';

function App() {
  const navigate = useNavigate();
  // const [login, setLogin] = useState('');
  const {username, setUsername} = useContext(StoreContext)


  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setUsername(userEmail || '');
      try {
        console.log(userEmail);
        } catch (error) {
          console.log(error);
        }
    }})
  }, []);

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
