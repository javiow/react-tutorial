import { useReducer, useState } from 'react';
import './App.css';
import TodoList from './components/todo/TodoList';
import todoReducer from './reducer/todo-reducer';
import { useImmerReducer } from 'use-immer';

function AppTodo(props) {

  const [todoText, setTodoText] = useState('');
  const [todos, dispatch ] = useImmerReducer(todoReducer, [
    { id:0, text: 'HTML&CSS 공부하기', done: false}
    , { id:1, text: '자바스크립트 공부하기', done: false}
  ])
  const [insertAt, setInsertAt] = useState(todos.length-1);

  //1. Added
  const handleAddTodo = () => {
    dispatch({
      type: 'added',
      nextId: todos.length,
      todoText
    })
    setTodoText('');
  }

  //2. Added_index
  const handleAddTodoByIndex = () => {
    dispatch({
      type:'added_index',
      insertAt,
      nextId: todos.length,
      todoText
    })
    setTodoText('');
  }

  const handleTodoTextChange = (e) => {
    setTodoText(e.target.value);
  }

  //3. Deleted
  const handleDeleteTodo = (deleteId) => {
    dispatch({
      type: 'deleted',
      deleteId
    })
  }

  const handleAddTodoOnEnter = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false){
      handleAddTodo();
    }
  }

  //4. Done
  const handleToggleTodo = (id, done) => {
    dispatch({ type: 'done', id, done})
  }

  //5. Reverse
  const handleReverse = () => {
    dispatch({ type: 'reverse' })
  }

  return (
    <div>
      <h2>할일목록</h2>
      <div>
        <input 
          type="text" 
          value={todoText} 
          onChange={handleTodoTextChange}
          onKeyDown={handleAddTodoOnEnter}
        />
        <button onClick={handleAddTodo}>추가</button>
      </div>
      <div>
        <select value={insertAt} onChange={(e) => setInsertAt(e.target.value)}>
          {todos.map((item, index) => (
            <option key={item.id} value={index}>{index} 번째</option>
          ))}
        </select>
        <button onClick={handleAddTodoByIndex}>{insertAt}번째 추가</button>
      </div>
      <div>
        Preview: {todoText}
      </div>
      <button onClick={handleReverse}>Reverse</button>
      <TodoList 
        todos={todos} 
        onDeleteTodo={handleDeleteTodo}
        onToggleTodo={handleToggleTodo}
      />
      
    </div>
  );
}

export default AppTodo;