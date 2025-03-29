import React, { createContext, useState} from 'react'
import run  from '../gemini.js'
export const datacontext = createContext()

function UserContext({children}) {
let [speaking, setSpeaking] = useState(false)
let [prompt, setPrompt] = useState("listening...")
let [response, setResponse] = useState(false)

    function speak(text){
      let text_speak = new SpeechSynthesisUtterance(text);
      text_speak.volume=1;
      text_speak.rate=1;
      text_speak.pitch=1;
      // text_speak.lang ="hi-GB";
      text_speak.lang = "hi-IN";
      window.speechSynthesis.speak(text_speak);
    }
    async function aiResponse(prompt) {
     let text=await run(prompt)
     let newText= text.split("*")&&text.split("*")&&text.replace("google","Chirag Prajapat")&&text.replace("Google","Chirag Prajapat")
     setPrompt(newText)
     speak(newText)
     setResponse(true)
     setTimeout(()=>{
      setSpeaking(false)
    }, 5000)


    }
    let speechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult=(e) => {
      let currentIndex = e.resultIndex
      let transcript = e.results[currentIndex][0].transcript
      setPrompt(transcript)
      takeCommand(transcript.toLowerCase())
      // aiResponse(transcript)
    }

    function takeCommand(command) {
      if(command.includes("open") && command.includes("youtube")){
        window.open("https://www.youtube.com/","_blank")
        speak("opening Youtube")
        setPrompt("opening Youtube...")
        setTimeout(()=>{
          setSpeaking(false)
        }, 4000)
      }
      else if(command.includes("open") && command.includes("google")){
        window.open("https://www.google.com/","_blank")
        speak("opening Google")
        setPrompt("opening Google...")
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        }, 4000)
      }
      else if(command.includes("open") && command.includes("instagram")){
        window.open("https://www.instagram.com/","_blank")
        speak("opening instagram")
        setPrompt("opening instagram...")
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        }, 4000)
      }
      else if(command.includes("open") && command.includes("snapchat")){
        window.open("https://www.snapchat.com/","_blank")
        speak("opening snapchat")
        setPrompt("opening snapchat...")
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        }, 4000)
      }
      else if(command.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"long",year:"numeric"})
        speak(date)
        setPrompt(date)
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        }, 4000)
        }
        
      else {
        aiResponse(command)
      }
    }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
  }
  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
    </div>
  )
}

export default UserContext


