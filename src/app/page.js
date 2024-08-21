import Link from "next/link";



export default function Home() {

  return (
    <div className="bg-slate-200">
      
      
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="my-20">
        <h1 className="text-center text-2xl font-bold my-3 animate-slideDown">SecondPapperApp.</h1>
        <p className="text-center text-medium my-1 animate-slideRight">All activites have been recorded here📔.</p>
        <p className="text-center text-large animate-slideLeft">Create your to do-list to be more productive by using this app.</p>
        </div>
      
    <div className="grid grid-cols-2 gap-4 m-5 animate-slideUp">

      
      <div className="border-2 border-black text-center rounded-lg bg-slate-300 hover:bg-slate-200">
        <h1 className="text-2xl font-bold m-3"><Link href={"/Task"}>Daily journal📑</Link></h1>
        <p className="text-sm m-5">Record what you feel in daily into your daily journal.</p>
        </div>
      <div className="border-2 border-black text-center rounded-lg bg-slate-300 hover:bg-slate-200">
        <h1 className="text-2xl font-bold m-3"><Link href={"/Todo"}>todolist🧾</Link></h1>
        <p className="text-sm m-5">Record what you want to do in to your to do list.</p>
        </div>

      
      
      
      </div>
    </div>
    </div>
    

      

  

  )
}
