import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { Item } from "./Item";


function App() {

  const [text, setText] = useState("")
  const [author, setAuthor]= useState("")
  const [list, setList] = useState([])


  
  
  const  handleSubmit = (e) =>{
      e.preventDefault()

      const newItem = {text: text, id:uuidv4(), author:author }

      if(!text || !author){
        alert("Please enter both values")
      } else{
        setList(prevList => {
          return [...prevList, newItem]
        })
        setText("")
        setAuthor("")
   
      }

     
  }

  const handleDelete = (id) =>{
    setList(list.filter((item) =>{
      return item.id !== id
    }) )
  }

  const clearAll = () =>{
    setList("")
  }

  const handleEdit = () =>{

  }
  
  return (
    <>
      <section className="hero">
        <h1>Todo</h1>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-control">
                  <label htmlFor="text">Author: </label>
                  <input type="text" id="text" value={author} onChange={(e)=> setAuthor(e.target.value)}/>
            </div>
            <div className="textContainer">
              <textarea placeholder="Type here" value={text} onChange={(e) =>setText(e.target.value) }id="" cols="30" rows="10">Type here</textarea>
            </div>
            <div className="btn-container">
             <button className="submit-btn">Submit</button>
            </div>
        </form>
      </section>
      {list.length > 0 &&
      <>
       <p className="clearAll" onClick={clearAll}>Clear all</p>
        <section className="text">
            <Item list={list} handleDelete={handleDelete} handleEdit={handleEdit}/>
        </section>
        </>
       }

      
     
    </>
  );
}

export default App;
