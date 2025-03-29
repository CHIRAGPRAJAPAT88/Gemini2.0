import React, { useContext } from 'react'
import './App.css'
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext'
function App() {
  let { recognition,speaking, setSpeaking ,prompt , setPrompt,response , setResponse } = useContext(datacontext)
  

  return (
   <div className="main">
    <img src="/img/ai.png" alt="" id='Gemini'/>
    <span>I' m Gemini 2.0 , Your Advanced Virtual Assistant</span>
    {!speaking? 
    <button onClick={() =>{
      setPrompt("listening...")
      setSpeaking(true)
      setResponse(false)
       recognition.start() 
       }}>Click here <CiMicrophoneOn /></button>
       :
       <div className='response'>
        { !response? <img src="/img/speak.gif" alt="" id='speak'/> 
        :
        <img src="/img/aiVoice.gif" alt="" id='aigif'/>}
        <p>{prompt}</p>
        </div>
       }
   </div>
  )
}

export default App


