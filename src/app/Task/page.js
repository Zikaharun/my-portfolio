"use client"
import { useState,useEffect } from "react";
import Link from "next/link";
const Page = () => {
    const [dailyNotes,setdailyNotes] = useState([]);
    const [title,setTitle] = useState('');
    const [content, setContent] = useState('');
    



    const saveDailyNotesToLocalStorage = (dailyNotes) => {
        localStorage.setItem("dailyNotes", JSON.stringify(dailyNotes))
    }

    const loadDailyFromLocalStorage = () => {
       try {
        const storedDaily = localStorage.getItem("dailyNotes");
        if(storedDaily) {
            return JSON.parse(storedDaily);
        }
       } catch (error) {
        console.error('failed to parse daily notes from local storage ', error);
       }
       return []
    }

    const createDailyNotes = () => {
        const today = new Date();
        const formatToday = today.toLocaleDateString();

        const newDailynotes = {
            id: dailyNotes.length + 1,
            title: title,
            content: content,
            date: formatToday,
            visible: false
        }

        const updateDailyNotes = [...dailyNotes, newDailynotes]
        setdailyNotes(updateDailyNotes);
        saveDailyNotesToLocalStorage(updateDailyNotes);
        setTitle('');
        setContent('');
    }

    const handleClick = (id) => {
        const updatedDaily = dailyNotes.map(dn => {
            if (dn.id === id) {
              return { ...dn, visible : !dn.visible };
            }
            return dn;
          });
          setdailyNotes(updatedDaily);
          saveDailyNotesToLocalStorage(updatedDaily);
        }

    const deletedDailyNotes = (id) => {
        const updateDailyNotes = dailyNotes.filter(dn => dn.id !== id);
        setdailyNotes(updateDailyNotes);
        saveDailyNotesToLocalStorage(updateDailyNotes);
    }

    useEffect(() => {
        const loadedDaily = loadDailyFromLocalStorage();
        setdailyNotes(loadedDaily);

    }, [])


    return(
        <div>
            <div className="m-5 flex flex-col items-center justify-center border-4 border-black animate-slideDown bg-slate-200 rounded-lg shadow-[rgb(7,7,7)_3px_3px_3px]">
            <h1 className="text-center m-10">Daily notes📑</h1>
            <div className="items-center flex flex-col justify-center">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..." className="border-2 border-black m-2 w-full px-4 py-2 rounded-lg shadow-[rgb(7,7,7)_3px_3px_3px]"/>
                <textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your daily journal... " rows={5} cols={30} className="border-2 border-black m-2 p-2 rounded-lg shadow-[rgb(7,7,7)_3px_3px_3px]"/>
                <button onClick={createDailyNotes} className="m-5 hover:bg-slate-100 bg-slate-300 p-2 border-2 border-black rounded ">add note</button>
            </div>
            </div>
            <div className="flex justify-center items-center m-3">
                <ul>
                   {dailyNotes.map( dn => {
                    return (
                        <div key={dn.id} className="border-2 border-black rounded my-2 animate-slideUp p-2 shadow-[rgb(7,7,7)_3px_3px_3px]">
                        <p>{dn.date}</p>
                        <li className="text-center my-5">{dn.title}<br></br>{dn.visible && (dn.content)}
                       <button onClick={()=>{handleClick(dn.id)}} className="m-2 text-center bg-slate-200 hover:bg-slate-100 p-1 rounded-lg border-2 border-black ">{dn.visible? 'hide':'show '}</button>
                       <button onClick={()=>{deletedDailyNotes(dn.id)}} className="m-2 text-center m-2 text-center bg-slate-200 hover:bg-slate-100 p-1 rounded-lg border-2 border-black">deleted</button>
                       </li>
                        </div>
                      
                       
                    )
                   })} 
                </ul>
            </div>
            <div className="m-3">
            <Link href={"/"} className=" hover:mx-3 hover:my-3 hover:bg-slate-100 bg-slate-300 p-2 border-2 border-black rounded shadow-[rgb(7,7,7)_3px_3px_3px] hover:shadow-[rgb(7,7,7)_1px_1px_1px] animate-slideRight">back</Link>
            </div>
            
            
        </div>
    )
}

export default Page;