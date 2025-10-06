import React,{useState,useEffect,useRef} from 'react'
import Highlights from './Highlights';

export default function BookContent(props) {
  const [bookContent,setbookContent]=useState("");
  // const [pages,setPages]=useState([]);
  // const [currentPage,setCurrentPage]=useState(0);

  const contentRef=useRef();

  useEffect(()=>{
    if(!props.bookURL){
      return;
    }

    const loadBook=async()=>{
      try{
        const proxyUrl = "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(props.bookURL.trim());
        let response=await fetch(proxyUrl);
        const data=await response.text();
        const parser=new DOMParser();
        const doc = parser.parseFromString(data, "text/html");

        //find image path as currently it is giving local host url
        doc.querySelectorAll("img").forEach(img => {
          let src = img.getAttribute("src");

          if (src && !src.startsWith("http")) {
            const baseUrl = props.bookURL.substring(0, props.bookURL.lastIndexOf("/") + 1);
            const absoluteUrl = baseUrl + src;

            // If you want to bypass CORS for images too:
            img.src = "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(absoluteUrl);
          }
        });

    //     //pagination: in html of gutenberg, pages are seperated using a tag as <a id="page_23">
    //     const nodeList=doc.querySelectorAll("span.pagenum a[id^='page_']");
    //     const arr=Array.from(nodeList);

    //     let bookPages=[];
    //     for(let i=0;i<arr.length;i++){
    //       const start=arr[i];
    //       const end=arr[i+1];

    //       //get content between starting and ending of the page
    //       let pageContent="";
    //       // content lies: span-> below a tag(i.e. sibling of a tag)
    //       let node=start.parentNode.nextSibling;

    //       //loop through all the siblibgs of the parent node(i.e. diff para on same page)
    //       while(node && node!==end?.parentNode){
    //         pageContent+=node.outerHTML || node.textContent || "";
    //         node=node.nextSibling;//move to next sibling
    //       }
    //       bookPages.push(pageContent);
    //     }
    //     setPages(bookPages);


        const text = doc.body.innerHTML;
        setbookContent(text);
      }catch(error){
        console.log(error);
      }
    }

    loadBook();
  },[props.bookURL]);
  return (
    <>
      <Highlights user={props.user} bookId={props.bookId} bookContent={bookContent} contentRef={contentRef} bookTitle={props.bookTitle}/>

    </>
  )
}