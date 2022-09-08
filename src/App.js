import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { Item } from "./Item";



const getLocalStorage = () =>{
  let list = localStorage.getItem("list")

  if(list){
    return JSON.parse(localStorage.getItem("list"))
  } else{
    return []
  }
}

function App() {

  const [text, setText] = useState("")
  const [author, setAuthor]= useState("")
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setisEditing]= useState(false)
  const [editId, setEditId] = useState(null)


  
  
  const  handleSubmit = (e) =>{
      e.preventDefault()

      const newItem = {text: text, id:uuidv4(), author:author }

      if(!text || !author){
        alert("Please enter both values")
      } else if(isEditing){

        setList(list.map((item) => {
          if(item.id === editId){
            return {...list, author: author, text:text}
          }
          return list
        }))
        setText("")
        setAuthor("")
        setEditId(null)
        setisEditing(false)


      }else{
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

  const handleEdit = (id) =>{
    const specificItem = list.find((item) =>{
      return item.id === id
    })

    console.log( specificItem.author)
    setEditId(id)
    setText(specificItem.text)
    setAuthor(specificItem.author)
    setisEditing(true)
  }

  useEffect(() =>{
    localStorage.setItem("list", JSON.stringify(list))
  },[list])

  
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
