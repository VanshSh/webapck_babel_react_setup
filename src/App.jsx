import { useState } from 'react'

// Make sure to include Bootstrap CSS in your index.html or import it in your JS
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)

  // Handle input change
  const handleChange = (e) => setInput(e.target.value)

  // Handle add or update
  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === '') return

    if (editId === null) {
      // Create
      setTodos([
        ...todos,
        { id: Date.now(), title: input.trim(), completed: false },
      ])
    } else {
      // Update
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, title: input.trim() } : todo
        )
      )
      setEditId(null)
    }
    setInput('')
  }

  // Handle edit
  const handleEdit = (id) => {
    const todo = todos.find((t) => t.id === id)
    setInput(todo.title)
    setEditId(id)
  }

  // Handle delete
  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id))
    if (editId === id) {
      setEditId(null)
      setInput('')
    }
  }

  // Toggle complete
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <div className='container mt-5' style={{ maxWidth: 500 }}>
      <h2 className='text-center mb-4'>Todo App</h2>
      <form className='mb-3' onSubmit={handleSubmit}>
        <div className='input-group'>
          <input
            className='form-control'
            placeholder='Add a todo...'
            value={input}
            onChange={handleChange}
          />
          <button
            className={`btn btn-${editId !== null ? 'success' : 'primary'}`}
            type='submit'
          >
            {editId !== null ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
      <ul className='list-group'>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className='list-group-item d-flex justify-content-between align-items-center'
          >
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                flex: 1,
                cursor: 'pointer',
              }}
              onClick={() => handleToggle(todo.id)}
            >
              {todo.title}
            </span>
            <div>
              <button
                className='btn btn-secondary btn-sm me-2'
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </button>
              <button
                className='btn btn-danger btn-sm'
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <div className='alert alert-info mt-3'>No todos yet.</div>
      )}
    </div>
  )
}

export default App
