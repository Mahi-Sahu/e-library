import React,{useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [error,setError]= useState("");
    const navigate=useNavigate();

    const handleSignIn=async (e)=>{
        e.preventDefault();
        try{
          await signInWithEmailAndPassword(auth,email,password);
          navigate("/");
        }catch(err){
          setError(err);
          console.log(error);
        }
    }

  return (
    <div className='signin-container'>
        <h2>Login</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Email:</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="xyz@gmail.com" onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Password:</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} required/>
            </div>
            <div className='mb-3 sign-in-footer'>
              <button className='sign-in-button' type='submit'>Login</button>
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>

        </form>
    </div>
  )
}
