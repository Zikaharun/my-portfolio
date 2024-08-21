"use client"
import Image from "next/image";
import React from "react";
import { useState,useEffect } from "react";
import Link from "next/link";

const page = () => {
    
        const [todos,setTodos] = useState([]);
        const [value,setValue] = useState('');
        const [valueTime, setValueTime] = useState('');
        const [valueDate, setValueDate] = useState('');
        
        
        


      
      
        const saveTodosToLocalStorage = (todos) => {
          localStorage.setItem('todos', JSON.stringify(todos));
        };
      
        const loadTodosFromLocalStorage = () => {
          try {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
              // Pastikan data yang diambil adalah string JSON yang valid
              return JSON.parse(storedTodos);
            }
          } catch (error) {
            console.error("Failed to parse todos from localStorage", error);
          }
          return [];
        };
      
      
        const creatTodo = () => {
          const valueTodoTrim = value.trim();
          const valueDateTrim = valueDate.trim();
          const valueTimeTrim = valueTime.trim();

          if (valueTodoTrim === "" && valueDateTrim === "" && valueTimeTrim ==="") {
            alert("todolist cannot blank!") 
            

            return;
          } 

            const newTodo = {
              id: todos.length + 1,
              todolist: value,
              time: valueTime,
              date: valueDate,
              completed: false
            }

            
      
            const updateTodo = [...todos,newTodo];
            setTodos(updateTodo);
            saveTodosToLocalStorage(updateTodo);
            setValue('');
            setValueTime('');
            setValueDate('');

            
            
            
            alert("succes add!");
          
          
            
          }
      
        const remove = (id) => {
          
          const updatedTodos = todos.filter(todo => todo.id !== id);
          setTodos(updatedTodos);
          saveTodosToLocalStorage(updatedTodos);
          alert("Success remove!");
        }

        const toggleCompleted = (id) => {
          const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
              return { ...todo, completed : !todo.completed };
            }
            return todo;
          });
          setTodos(updatedTodos);
          saveTodosToLocalStorage(updatedTodos);
          
          

        }

        const completedCount = todos.filter(todo => todo.completed).length;
        const progressCount = todos.filter(todo => !todo.completed).length;
        
      
        useEffect(() => {
          const loadedTodos = loadTodosFromLocalStorage();
          setTodos(loadedTodos);
          console.log(loadedTodos)
        }, []);
      
      
      
      
        return (
          <>
          <div>
          <div className="m-5 flex flex-col items-center justify-center border-4 border-black bg-slate-200 rounded animate-slideUp">
            <h1 className="text-center m-10">Todo list🧾.</h1>
            <p className="text-justify m-3">to do finish {completedCount}</p>
            <div className="items-center flex md:flex-row flex-col justify-center m-5">
              
              
              
            <input  type="text" value={value} onChange={(e) => setValue(e.target.value)} className="border-1 border-black p-2 m-2 rounded-lg" placeholder="My todo..."/>
            <input type="time" value={valueTime} onChange={(e) => setValueTime(e.target.value)} className="border-1 border-black rounded-lg m-2"/>
            <input type="date" value={valueDate} onChange={(e) => setValueDate(e.target.value)} className="border-1 border-black rounded-lg m-2"/>
            
            
            <ul>
              
                {todos.map( todo => {
                  return (
                  <li key={todo.id} className="p-2 m-3 text-start bg-slate-200 rounded">{todo.completed?  (<s>{todo.todolist} {todo.time} {todo.date}</s>) : `${todo.todolist} ${todo.time} ${todo.date}`} 
                  <button onClick={()=>{remove(todo.id)}} className=" bg-slate-300 hover:bg-slate-200 text-white px-1 rounded m-2">remove</button><button onClick={()=>{toggleCompleted(todo.id)}} className="bg-slate-300 hover:bg-slate-200 text-white px-1 rounded mx-1">{todo.completed? 'undo':'completed'}</button></li>
                  
                  )
                })}
      
      
            </ul>
            </div>
           <p className="m-1">to do progress {progressCount}</p>
            <button onClick={creatTodo} className="mx-auto mb-4 border-2 border-black hover:bg-slate-500 bg-black text-white px-3 rounded-lg">+</button>
      
          </div>
          <Link href="/" className="m-5 hover:mx-7 hover:my-7 hover:bg-slate-100 bg-slate-300 p-2 border-2 border-black rounded shadow-[rgb(7,7,7)_3px_3px_3px] hover:shadow-[rgb(7,7,7)_1px_1px_1px] animate-slideUp">back</Link>
          </div>
          
          </>
          
        );
    
}

export default page;