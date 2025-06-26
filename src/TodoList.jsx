import React from 'react'
import TodoItem from './TodoItem'

const TodoList = React.memo(function TodoList({
  todos,
  onEdit,
  onDelete,
  onToggle,
}) {
  if (todos.length === 0) {
    return <div className='alert alert-info mt-3'>No todos yet.</div>
  }
  return (
    <ul className='list-group'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  )
})

export default TodoList
