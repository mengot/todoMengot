import React, {useState, useEffect} from "react";
import Create from './Create'
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };
    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                // Fetch todos again to update the state without refreshing
                fetchTodos();
            })
            .catch(err => console.log(err));
    };
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                // Fetch todos again to update the state without refreshing
                fetchTodos();
            })
            .catch(err => console.log(err));
    };


    return (
        <div className="home">  
            <h2>Todo List</h2>
          <Create />
          <div className="space"> 
          {
            todos.length === 0
            ?
            <div><h2>No Records </h2></div>
            :
            
            todos.map(todo => {
                return (
                 
                <div className="task">
                    <div className="checkbox" onClick={handleEdit(todo._id)}>
                        {todo.done ?
                        <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill> 
                        : 
                        <BsCircleFill className='icon'/>
                    
                        }
                        <p className={todo.done ? "line_through" : ""}> {todo.task}</p>
                    </div>
                    <div>
                        <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/></span>
                    </div>
                   
                </div>
                );
            })
        }
        </div>
        </div>
    )
}

export default Home