// todoHandlers.js
// All handler functions for ToDoApp

export const handleChange = (setInput) => (e) => setInput(e.target.value)

export const handleSubmit =
  (input, editId, setTodos, setEditId, setInput) => (e) => {
    e.preventDefault()
    if (input.trim() === '') return
    if (editId === null) {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), title: input.trim(), completed: false },
      ])
    } else {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, title: input.trim() } : todo
        )
      )
      setEditId(null)
    }
    setInput('')
  }

export const handleEdit = (todos, setInput, setEditId) => (id) => {
  const todo = todos.find((t) => t.id === id)
  setInput(todo.title)
  setEditId(id)
}

export const handleDelete = (editId, setTodos, setEditId, setInput) => (id) => {
  setTodos((prev) => prev.filter((t) => t.id !== id))
  if (editId === id) {
    setEditId(null)
    setInput('')
  }
}

export const handleToggle = (setTodos) => (id) => {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  )
}
