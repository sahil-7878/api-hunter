import React from 'react'

function TodoForm({ handleSubmit, handleInput, task }) {
  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskname">Task Name</label>
          <input 
            onChange={handleInput} 
            value={task.taskname || ''} 
            type="text" 
            name="taskname" 
            id="taskname" 
            placeholder="Enter task name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="taskdes">Task Description</label>
          <textarea 
            onChange={handleInput} 
            value={task.taskdes || ''} 
            name="taskdes" 
            id="taskdes"
            placeholder="Enter task description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="taskpriority">Task Priority</label>
          <select 
            onChange={handleInput} 
            name="taskpriority" 
            id="taskpriority"
            required
          >
            <option value="" disabled selected>Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button type="submit" className='submit-btn'>Add Task</button>
      </form>
    </div>
  )
}

export default TodoForm
