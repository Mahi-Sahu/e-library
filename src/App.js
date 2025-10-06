import React,{useState,useEffect} from 'react'
import {ToastContainer} from 'react-toastify'
import Navbar from './components/Navbar'
import BookViewers from './components/BookViewers'
import LeftTab from './components/LeftTab'
import './App.css'
import About from './components/About'
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignUp from './components/SignUp'
import Login from './components/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'


export default function App() {
  //handle lefttab
  const[sidebarOpen,setSidebarOpen]=useState(false);
  const [progress,setProgress]=useState(0);
  const [bookName, setBookName] = useState("");
  const [user,setUser]=useState(null);

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged (auth,(currentUser)=>{
      setUser(currentUser);
    });
    return ()=> unsubscribe();
  },[]);

  const handleSearch=(bookTitle)=>{
    setBookName(bookTitle);
    console.log(bookTitle);
  }

  return (
    <div>
      <Router>
          <Navbar onSearch={handleSearch} toggleSideBar={()=>setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} user={user}/> {/*on click reverse the value of side bar open*/}
          <LoadingBar
              progress={progress}
              height={2}
              color='red'
              //onLoaderFinished={() => this.onLoaderFinished()}
          />
          <Routes>
            {/* only show bookViewers when logged in */}
            <Route exact path="/" element={
              user?(
                <div className='main-section'>
                  <div className={`left-tab ${sidebarOpen? "open" : "closed"}`}>
                    <LeftTab  isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)} user={user}/>
                  </div>
                  <div className={`book-viewer ${sidebarOpen?"shifted" : ""}`}>
                    <BookViewers title={bookName} sidebarOpen={sidebarOpen} setProgress={setProgress} user={user}/>
                  </div>
                </div>
              ):(
                <Navigate to="/login" replace/>
              )
            }/>
            <Route exact path="/about" element={<About/>}/>

            {/* auth routes */}
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/signup' element={<SignUp/>}/>
          </Routes>
        </Router>

        <ToastContainer/>
    </div>
  )
}