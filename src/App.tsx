import React, {useEffect, useState} from 'react';
import './App.css';
import { SignUp } from './components/Signup/Signup';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { SignIn } from './components/SignIn/SignIn';
import { MainView } from './components/MainView';
import { firebaseAuth } from './index';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');

  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setLogin(userEmail || '');
      try {
        console.log(userEmail);
        } catch (error) {
          console.log(error);
        }
    }})
  }, []);

  useEffect((): void => {
    if(login) {
      navigate('/wallet');
    } else {
      navigate('/signin');
    }
  }, [login, navigate]);

  return (
    <Routes>
       <Route path='signup' element={<SignUp/>} />
       <Route path='signin' element={<SignIn/>} />
       <Route path='wallet' element={<MainView/>} />
    </Routes>
   
  );
}

export default App;
