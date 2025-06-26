import React from 'react'

const TodoItem = React.memo(function TodoItem({
  todo,
  onEdit,
  onDelete,
  onToggle,
}) {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          flex: 1,
          cursor: 'pointer',
        }}
        onClick={() => onToggle(todo.id)}
      >
        {todo.title}
      </span>
      <div>
        <button
          className='btn btn-secondary btn-sm me-2'
          onClick={() => onEdit(todo.id)}
        >
          Edit
        </button>
        <button
          className='btn btn-danger btn-sm'
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
})

export default TodoItem
