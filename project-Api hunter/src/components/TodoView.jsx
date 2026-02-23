import React from 'react'

function TodoView({ list, totalPages, handlePagination, handleDelete, handleEdit, startIndex, currentPage }) {
  return (
    <div>
      <div className="table-card">
        <div className="table-header">
          <h5>Tasks</h5>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>No.</th>
                <th>Task Name</th>
                <th style={{ width: '200px' }}>Description</th>
                <th style={{ width: '100px' }}>Priority</th>
                <th style={{ width: '150px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.length !== 0 ? (
                list.map((task, index) => (
                  <tr key={task.id}>
                    <td className="sr-no">{startIndex + index + 1}</td>
                    <td className="fw-500">{task.taskname}</td>
                    <td style={{ maxWidth: 200, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {task.taskdes}
                    </td>
                    <td>
                      <span className={`priority-badge priority-${task.taskpriority.toLowerCase()}`}>
                        {task.taskpriority}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-delete" onClick={() => handleDelete(task.id)}>Delete</button>
                        <button className="btn-edit" onClick={() => handleEdit(task.id)}>Edit</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state">
                      <div className="empty-state-icon">📋</div>
                      <p>No tasks yet. Create your first task to get started!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={i}
                onClick={() => handlePagination(pageNum)}
                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
              >
                {pageNum}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TodoView
