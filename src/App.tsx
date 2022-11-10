import React, {useEffect} from 'react';
import './App.css';
import { SignUp } from './components/Signup/Signup';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { SignIn } from './components/SignIn/SignIn';
import { MainView } from './components/MainView';

function App() {
  const navigate = useNavigate();

  useEffect((): void => {
    navigate('/signup');
  }, []);

  return (
    <Routes>
       <Route path='signup' element={<SignUp/>} />
       <Route path='signin' element={<SignIn/>} />
       <Route path='wallet' element={<MainView/>} />
    </Routes>
   
  );
}

export default App;
