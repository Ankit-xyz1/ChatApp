import { useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast'

import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Signup from "./pages/Signup";
import Setting from "./pages/Setting";
import Prrrofile from "./pages/Prrrofile";
import { authStore } from "./store/authStore";
import {Loader} from 'lucide-react';
import Login from "./pages/Login";
import { themeStore } from "./store/themeStore";

const App = () => {
  const {theme} = themeStore();
  const {authUser, checkAuth,isCheckingAuth,onlineUsers} = authStore();
  useEffect(() => {
    checkAuth();
    console.log("i am auth",authUser)
    console.log("online user",onlineUsers);
    
  }, [checkAuth,onlineUsers])


  if(isCheckingAuth  && !authUser){
    return(
      <>
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
      </>
    )
  }
  return (
    <Router>
      <div data-theme={theme}>
      <Toaster/>
        <Navbar/>
        <Routes>
          <Route path="/" element={authUser? <Home /> : <Navigate to={'/login'}/> } />
          <Route path="/signup" element={!authUser?<Signup/>:<Navigate to={'/'}/>} />
          <Route path="/login" element={!authUser?<Login/>:<Navigate to={'/'}/>} />
          <Route path="/setting" element={<Setting/>} />
          <Route path="/profile" element={authUser?<Prrrofile/>:<Navigate to={'/login'}/>}/>
          <Route path="/:id" element={authUser?<Home />:<Navigate to={'/login'}/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
