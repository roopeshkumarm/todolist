import { useEffect, useState } from 'react';
import { Button, InputGroup, Toaster } from '@blueprintjs/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState("");

  const notify = () => {
    toast.warn("Input Field Empty");
  }

  const notify2 = () => {
    toast.warn("Complete previous Tasks")
  }

  const notify3 = () => {
    toast.success('Deleted Successfully')
  }
  const notify4=()=>{
    toast.success('Task Created Successfully')
  }

  const addUser = () => {
    const Task = newTask.trim();
    if (Task.length!=0) {
        notify4()
    }
    

    if (users.length === 20) {
      notify2();
      return;
    }

    if (Task === '' || Task.length === 0) {
      notify();
      return;
    }

    setUsers(prevUsers => [...prevUsers, { S_no: prevUsers.length + 1, Task, isStriked: false }]);
    setNewTask("");
  }

  const handleStrike = (S_no) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.S_no === S_no) {
          return { ...user, isStriked: !user.isStriked };
        }
        return user;
      });
    });
  }

  const deleteUser = (S_no) => {
    setUsers((users) => {
      notify3()
      return users.filter(user => user.S_no !== S_no)
    });
  }

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <table className='bp4-html-table modifier'>
        <thead>
          <th >S_no</th>
          <th >Task</th>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.S_no}>
              <td>{user.S_no}</td>
              <td className={user.isStriked ? 'striked-text' : ''}>{user.Task} </td>
              <td>
                <Button intent='primary' onClick={() => handleStrike(user.S_no)}>Complete</Button>
                &nbsp;
                <Button intent='danger' onClick={() => deleteUser(user.S_no)}>Delete</Button>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td >
              <InputGroup 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder='Enter Task...'
                
              />
            </td>
            <td>
              <Button intent='success' onClick={addUser}>Add Task</Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
