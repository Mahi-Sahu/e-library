import React,{useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import '../styles/SignUp.css'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [error,setError]= useState("");
    const navigate=useNavigate();

    const handleSignUp=async (e)=>{
      e.preventDefault();
      try{
        await createUserWithEmailAndPassword(auth,email,password);
        navigate("/");
      }catch(err){
        setError(err.message);
        console.log(error);
      }
      
    }

  return (
    <div className='signup-container'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Email:</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="xyz@gmail.com" onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Password:</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} required/>
            </div>
            <div className='mb-3'>
              <button className='sign-up-button' type='submit'>Sign Up</button>
            </div>
        </form>
    </div>
  )
}
