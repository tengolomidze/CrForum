import Main from "./components/main/Main";
import CreatePost from "./components/post/CreatePost";
import User from "./components/user/User";
import LogIn from "./components/user/LogIn";
import Register from "./components/user/Register";
import EditUser from "./components/user/EditUser"; 
import SeePost from "./components/post/SeePost";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import ScrollOnTop from "./js/ScrollOnTop";
import axios from "axios"

const App = () => {

  const cookies = new Cookies(); 

  const [user, setUser] = useState({
    isUser: false,
  })

  let backendURL = "http://127.0.0.1:8000"
  
  const app = {backendURL, cookies, user, setUser};


  useEffect(() => {
      const fetchData = async () => {
          axios.post(app.backendURL + "/api/user", {jwt: cookies.get("jwt")}).then(res => 
            {
                setUser({
                  isUser: true,
                  name: res.data.name,
                  img: res.data.img,
                  id: res.data.id
                })
            }).catch((e) => {
                console.log(e.message)
            })

          
            
      };
      
      fetchData();
  }, []);


  

  

  return (
    <BrowserRouter>
      <ScrollOnTop/>
      <Routes>
        <Route path="/" element={<Main app={app}/>}/>
        <Route path="/post/create" element={<CreatePost app={app}/>}/>
        <Route path="/post" element={<SeePost app={app}/>}/>
        <Route path="/user" element={<User app={app}/>}/>
        <Route path="/user/edit" element={<EditUser app={app}/>}/>
        <Route path="/login" element={<LogIn app={app}/>}/>
        <Route path="/register" element={<Register app={app}/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
