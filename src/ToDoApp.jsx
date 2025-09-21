import React, { useState, useCallback, useMemo } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import {
  handleChange as handleChangeHelper,
  handleSubmit as handleSubmitHelper,
  handleEdit as handleEditHelper,
  handleDelete as handleDeleteHelper,
  handleToggle as handleToggleHelper,
} from './todoHandlers'

const stylinObj = {
  container: {
    maxWidth: 500,
  },
}
function ToDoApp() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)

  const handleChange = useCallback(handleChangeHelper(setInput), [])

  const handleSubmit = useCallback(
    handleSubmitHelper(input, editId, setTodos, setEditId, setInput),
    [input, editId]
  )

  const handleEdit = useCallback(handleEditHelper(todos, setInput, setEditId), [
    todos,
  ])

  const handleDelete = useCallback(
    handleDeleteHelper(editId, setTodos, setEditId, setInput),
    [editId]
  )

  const handleToggle = useCallback(handleToggleHelper(setTodos), [])

  const memoizedTodos = useMemo(() => todos, [todos])

  return (
    <div className='container mt-5' style={stylinObj.container}>
      <h2 className='text-center mb-4'>Todo List App.</h2>
      <TodoInput
        input={input}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={editId !== null}
      />
      <TodoList
        todos={memoizedTodos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  )
}

export default ToDoApp
