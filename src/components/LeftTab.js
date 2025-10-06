import React from 'react'
import '../styles/LeftTab.css'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

export default function LeftTab(props) {
  const navigate=useNavigate();

  const handleProtectedClick=(e,path,featureName)=>{
    e.preventDefault();//stops any navigation
    if(!props.user){
      toast.info(`To access ${featureName}, Login or SignUp!`);
    }else{
      navigate(path);
    }
  }

  return (
    <>
      <div className='title'>
        <h2>Menu</h2>
        <i className="fa-solid fa-circle-xmark" style={{cursor: "pointer"}} onClick={props.onClose}></i>
      </div>
      <div className="list-group list-group-flush">
        <a href="/" className="list-group-item list-group-item-action active" aria-current="true">
          Your current book
        </a>
        <a href="/" className="list-group-item list-group-item-action" onClick={(e)=>handleProtectedClick(e,"Journal")}>Journal</a>
        <Link to="/highlightsTab" className="list-group-item list-group-item-action" onClick={(e)=>handleProtectedClick(e,"/highlightsTab","Highlights and notes")}>Highlights and Notes</Link>
      </div>
    </>
  )
}