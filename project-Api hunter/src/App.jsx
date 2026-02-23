import React, { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoView from './components/TodoView';
import './App.css';

const App = () => {

  const [task, setTask] = useState({});
  const [list, setList] = useState([]);
  const [masterlist, setMasterlist] = useState([]);
  const [mount, setMount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const taskPerPage = 10;

  let indexOfLastItem = currentPage * taskPerPage;
  let indexOfFirstItem = indexOfLastItem - taskPerPage;
  let currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  let totalPages = Math.ceil(list.length / taskPerPage)

  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem('list')) || [];
    setMasterlist(oldData);
    setList(oldData);
    setMount(true);
  }, [])

  useEffect(() => {
    if (mount) {
      localStorage.setItem('list', JSON.stringify(masterlist));
    }
  }, [masterlist, mount])

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedList = [...list, { ...task, id: Date.now() }];
    setList(updatedList);
    setMasterlist(updatedList);
    setTask({});
    setCurrentPage(1);
  }
  const handleDelete = (id) => {
    const filtered = list.filter(item => item.id !== id);
    setList(filtered);
    setMasterlist(filtered);
    const newTotalPages = Math.max(1, Math.ceil(filtered.length / taskPerPage));
    if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
  }

  const handleEdit = (id) => {
    const item = list.find(i => i.id === id);
    if (!item) return;
    // populate form for edit and remove old item (simple flow)
    setTask({ taskname: item.taskname, taskdes: item.taskdes, taskpriority: item.taskpriority });
    const without = list.filter(i => i.id !== id);
    setList(without);
    setMasterlist(without);
  }
  const handlePagination = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header">
          <h1>Task Manager</h1>
          <p>Organize your tasks efficiently</p>
        </div>
        <TodoForm handleSubmit={handleSubmit} handleInput={handleInput} task={task} />
        <TodoView
          list={currentItems}
          totalPages={totalPages}
          handlePagination={handlePagination}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          startIndex={indexOfFirstItem}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default App
