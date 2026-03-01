import { useContext, useState } from "react";
import { useTodos, useTodosDispatch } from "../../context/TodoContext";

export default function AddTodo(){
  
  const [todoText, setTodoText] = useState('');
  const dispatch = useTodosDispatch()
  const todos = useTodos();

  //1. Added
  const handleAddTodo = (text) => {
    dispatch({
      type: 'added',
      nextId: todos.length,
      todoText: text
    })
  }

  return(
    <div>
      <input 
        type="text" 
        value={todoText} 
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.nativeEvent.isComposing === false){
            handleAddTodo(e.target.value);
            setTodoText('');
          }
        }}
      />
      <button onClick={() => {
        // 저장
        setTodoText('');
        handleAddTodo(todoText);
      }}>추가</button>
    </div>
  )
}