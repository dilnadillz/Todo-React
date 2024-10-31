import React, { useState } from 'react'

const Todo = () => {

  const [input,setInput] = useState("");

  const [items,setItems] = useState([]);

  const [editingIndex,setEditingIndex] = useState(null)

  const [editText,setEditText] = useState("")

  const handleChange = (event) =>{
    setInput(event.target.value)
  }

  const storeItems = (event) => {
    event.preventDefault()
    setItems([...items,input])
    setInput("")
  }

  const deleteItem = (index) => {
    const newItems = [...items]
    newItems.splice(index,1)
    setItems(newItems)
  }

  const startEditing = (index, text) => {
    setEditingIndex(index)
    setEditText(text)
  }

  const handleEditChange = (event) => {
    setEditText(event.target.value)
  }

  const saveEdit = (index) => {
    const newItems = [...items]
    newItems[index] = editText
    setItems(newItems)
    setEditingIndex(null)
    setEditText("")
  }

  return (
    <div className='todo-container'>
      <form className='input-section' onSubmit={storeItems}>
        <h1>Todo App</h1>
        <input 
           type='text' 
           value={input} 
           onChange={handleChange} 
           placeholder='Enter Items...'
        />
      </form>
      <ul>
        {items.map((data,index)=> (
          <li key={index}>
            {editingIndex === index ? (
               <input
               type='text'
               value={editText}
               onChange={handleEditChange}
               onBlur={()=> saveEdit(index)}
               onKeyDown={(e) => {
                 if(e.key === "Enter") saveEdit(index);
               }}
             />
            ) : (
              <span>{data}</span>
            )}
           

            <div>
             <i
                className="fa-regular fa-pen-to-square"
                onClick={() => startEditing(index, data)}
              ></i>
              <i className='fa-regular fa-trash-can'
                 onClick={()=>deleteItem(index)}
              ></i>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Todo
