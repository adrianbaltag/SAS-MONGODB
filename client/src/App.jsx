// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import "./App.css"
// import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Recomandations from "./pages/Recomandations";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Login from "./components/Login";
// import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import AddPost from "./pages/AddPost";
import ViewAdminPost from "./pages/ViewAdminPost";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("token"));
    if (userToken !== null) {
      var user = userToken.split(" ")[1];
      user = JSON.parse(atob(user.split(".")[1]));
      console.log("Home: ", user);
      setUser(user);
    }
  }, []);

  return (
    <div className="App">
     
      {/* <Home/>  */}
      {/* <Navbar /> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path ="/dashboard" element={ <AdminDashboard />}/>

       {/* {Protected Routes}  */}

   <Route element={<RequireAuth />} >
        <Route path="/recomandations" element={<Recomandations />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<ViewAdminPost />} />
        <Route path="/post" element={<SinglePost />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/*" element={<ErrorPage />} />
      </Route>

    </Routes> 
    </div > 
  );
}

export default App;
