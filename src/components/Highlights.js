import React,{ useEffect} from 'react'
import {doc, getDoc,setDoc,updateDoc,arrayUnion} from "firebase/firestore";
import {db} from "../firebase"
import '../styles/Highlights.css'

export default function Highlights(props) {
    //props.contentRef now holds a reference to the container <div> of book content.

    //to display highlighted text whenever the component(bookContent) mounts
    useEffect(()=>{
        if(props.user && props.bookId){
            applySavedHighlights();
        }
    },[props.user,props.bookId,props.bookContent]);

    const applySavedHighlights=async ()=>{
        if(!props.user || !props.user.uid)
            return;
        const docRef=doc(db,"users",props.user.uid,"books",String(props.bookId));
        const snapshot=await getDoc(docRef);
        if(snapshot.exists()){
            const highlights=snapshot.data().highlights || [];
            highlights.forEach(h=>highlightText(h.text));
        }
    }

    //highlightText in DOM
    const highlightText=(text)=>{
        if (!text || !props.contentRef.current) return;

        const container = props.contentRef.current;
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
        const nodesToProcess = [];

        while (walker.nextNode()) {
            if (walker.currentNode.nodeValue.includes(text)) {
                nodesToProcess.push(walker.currentNode);
            }
        }

        nodesToProcess.forEach(node => {
            const parent = node.parentNode;

            // Undo highlight if already highlighted
            if (parent.classList?.contains('user-highlight') && parent.textContent === text) {
                const textNode = document.createTextNode(parent.textContent);
                parent.parentNode.replaceChild(textNode, parent);
                return;
            }

            // Otherwise, highlight all occurrences in this text node
            const parts = node.nodeValue.split(text);
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < parts.length; i++) {
                fragment.appendChild(document.createTextNode(parts[i]));
                if (i < parts.length - 1) {
                    const span = document.createElement('span');
                    span.className = 'user-highlight';
                    span.textContent = text;
                    fragment.appendChild(span);
                }
            }

            parent.replaceChild(fragment, node);
        });
    }

    //to save new highlight in firebase:
    const saveText=async (text)=>{
        if(!props.user || !props.user.uid){
            console.warn("User not logged in, skipping highlight save");
            return;
        }
        const docRef=doc(db,"users",props.user.uid,"books",String(props.bookId)); //path in firebase :users/{uid}/books/{bookId}
        //fetch the data from firestore
        const snapshot=await getDoc(docRef);
        if(!snapshot.exists()){
            //then create it and add a field in highlights
            await setDoc(docRef,{highlights: [{text}]});
        }
        else{
            await updateDoc(docRef,{highlights: arrayUnion({text})});
        }
    }

    //to select text:
    const handleTextSelect=()=>{
        const selection=window.getSelection(); //browser selection api to get the selected text
        const text=selection.toString().trim();
        if(text){
            highlightText(text);
            saveText(text);
        }
    }

  return (
    <div className='book-highlights' ref={props.contentRef} onMouseUp={handleTextSelect}
        dangerouslySetInnerHTML={{__html: props.bookContent}}>
      
    </div>
  )
}
