import React from 'react'

const TodoInput = React.memo(function TodoInput({
  input,
  onChange,
  onSubmit,
  isEditing,
}) {
  return (
    <form className='mb-3' onSubmit={onSubmit}>
      <div className='input-group'>
        <input
          className='form-control'
          placeholder='Add a todo...'
          value={input}
          onChange={onChange}
        />
        <button
          className={`btn btn-${isEditing ? 'success' : 'primary'}`}
          type='submit'
        >
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  )
})

export default TodoInput
