import React, { Suspense } from 'react'
// import TodoItem from './TodoItem'

const TodoItem = React.lazy(() => import('./TodoItem'))
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
    <ul className='p-0'>
      {todos.map((todo) => (
        <Suspense key={todo.id} fallback={<div>Loading...</div>}>
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        </Suspense>
      ))}
    </ul>
  )
})

export default TodoList
