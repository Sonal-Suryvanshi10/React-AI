import React, {useState} from 'react'
import askAi from './AskAi';

export default function App() {

  let [aiRes,setAiRes] = useState("");

  async function handleSubmit(e)
  {
    e.preventDefault();
    let userAsked =e.target[0].value;
    let res = await askAi(userAsked);
    res = JSON.parse(res);
    setAiRes(res)
  }

  return (
    <div>
      <div className='bg-indigo-500 px-4 py6 rounded-2xl text-white m-5 p-5' id="header">
        <h2 className='text-2xl font-bold'>The Ai App With React</h2>
      </div>

      <div className='bg-slate-100 h-[18vh] m-5 px-4 py-8 rounded-2xl shadow-2xl shadow-slate-350 border-indigo-300 border' id="FormsSection">
        <form onSubmit={handleSubmit}>
          <input className='w-full border border-slate-300 rounded-2xl px-4 py-2' type='text' placeholder='Type Anything...'/>
          <button className='px-3 py-1 bg-indigo-400 rounded-2xl text-white mt-2 active:bg-indigo-600 cursor-pointer'>Ask Ai</button>
        </form>
      </div>

      <div className='bg-slate-100 h-[40vh] m-5 px-4 py-8 rounded-2xl shadow-2xl shadow-slate-350 border-indigo-300 border' id="FormsSection">
        <h4 className='text-xl font-bold mb-4' id="outPutTitle">Ai Response:</h4>
        <div className='text-slate-600'>
          <p className='mb-3 text-md text-indigo-500 font-bold'>{aiRes.greeting}</p>
          <h2 className='mb-2 text-lg text-rose-500 font-bold'>{aiRes.heading}</h2>
          <h6 className='mb-2 text-xl text-slate-500 font-bold'>{aiRes.answer}</h6>
        </div>
      </div>
    </div>
  )
}