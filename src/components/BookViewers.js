import React,{useState,useEffect} from 'react'
import '../styles/BookViewer.css'
import BookContent from './BookContent';

export default function BookViewers(props) {
  const [bookDetails, setBookDetails]= useState(null);
  const [pageInput,setPageInput]=useState("");

  //page-search handle function
  const handlePageSearch=(pageNumber)=>{
    const target=document.querySelector(`#page_${pageNumber}`);
    if(target){
      target.scrollIntoView({behavior: "smooth", block: "start"});
    }
    else{
      alert("Page not found");
    }
  }
  
  //fetch api to get book details using props.title
  useEffect(() => {
    if(!props.title){
      console.log("No book title provided");
      return;
    }
    console.log("Fetching book details for:", props.title);
    props.setProgress(10);
    const fetchBookDetails= async()=>{
      try{
        const response= await fetch(`https://gutendex.com/books?search=${encodeURIComponent(props.title)}`);
        props.setProgress(30);
        const data= await response.json();
        props.setProgress(70);
        console.log(data);

        if(data.results.length > 0){
          setBookDetails(data.results[0]);//use the result in first index of fetched array
          props.setProgress(100);
        }
        else{
          console.log("No book found with the given title");
          setBookDetails(null);
          props.setProgress(100);
        }
      }
      catch(error){
        console.error("Error fetching book details:", error);
        setBookDetails(null);
      }
    }

    fetchBookDetails();
    console.log(props.user);
  },[props.title,props.user]);


  return (
    <>
      {bookDetails ? (
        <div className='book-viewers'>
          <div className={`book-viewers-header sticky-header ${props.sidebarOpen? "collapse": "full"}`}>
            <div className='book-viewers-header title'>
            <h2 className='title-section'>{bookDetails.title}</h2>
            <p>By: {(bookDetails.authors && bookDetails.authors.length>0) ? bookDetails.authors[0].name : "Unknown" }</p>
          </div>
          <div className='page-search'>
            <form className="search-bar" role="search" onSubmit={(e)=>{e.preventDefault();
            handlePageSearch(pageInput)
            }}>
              <input className="input-box" type="text" placeholder="Enter page number" value={pageInput} aria-label="Search" onChange={(e)=>setPageInput(e.target.value)}/>
              <button type="submit" >Search</button>
            </form>
          </div>
        </div>
  
          <div className='book-viewers-content'>
              <BookContent bookURL={`https://www.gutenberg.org/files/${bookDetails.id}/${bookDetails.id}-h/${bookDetails.id}-h.htm`} user={props.user} bookId={bookDetails.id} bookTitle={bookDetails.title}/>
          </div>
        </div>
      ):(
        <p>No details found</p>
      )}
    </>
  )
}