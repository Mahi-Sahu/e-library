import React,{useState} from 'react'
import '../styles/Navbar.css'
import {
  Link,
  useNavigate
} from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

export default function Navbar(props) {
  const navigate=useNavigate();
  // handle search click to get the title of the book
  const [input, setInput] = useState("");
  const handleSearch=(e)=>{
    e.preventDefault();
    if(input.trim()!==""){
      props.onSearch(input.trim());//send to App.js
      setInput("");
    }
  }

  const [dropDownOpen,setDropDownOpen]=useState(false);
  const handleLogout=async ()=>{

    if(props.user){
      const confirm=window.confirm("Do you want to logout?");
      if(confirm){
        try{
          await signOut(auth);
          toast.success("Logged out successfully");
          navigate("/login");
        }catch(err){
          toast.error("Failed to log out. Try again");
        }
      }
    }else{
      toast.error("Not signed in");
    }
  }


  return (
    <nav>
      <div className='navbar'>
          <div className='nav-links'>
              <i className={`fa-solid fa-bars ${props.sidebarOpen ? "active-menu" : ""}`} onClick={props.toggleSideBar} style={{cursor: "pointer"}}></i>
              <h3 className='logo'>E-Library</h3>
              <Link to="/">Home</Link>
              {/* <a href="/">Categories</a> */}
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
          </div>
          <div className='search-logout-container'>
            <div className="search-container">
              <form className="search-bar" role="search">
                <input className="input-box" type="text" onChange={(e)=>setInput(e.target.value)}  placeholder="Enter book title" aria-label="Search"/>
                <button type="submit" onClick={handleSearch}>Search</button>
              </form>
            </div>
            <div className='logout-container' onClick={()=>setDropDownOpen(!dropDownOpen)}>
              <i className="fa fa-user" aria-hidden="true"></i>
              {dropDownOpen && 
                <div className='dropdown-menu'>
                  <ul>
                    <li style={{marginBottom:"3px", cursor:"auto"}}>{props.user? `Signed in as ${props.user?.email}` : "Sign in to use features!"}</li>
                    <li style={{color:"wheat", textDecoration:"none"}} onClick={handleLogout}>Logout</li>
                  </ul>    
                </div>
              }
            </div>
          </div>
      </div>
    </nav>
  )
}