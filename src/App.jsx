import { useState,useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import { useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")
  const passwordRef=useRef(null)

  const passwordgenerator=useCallback(()=>{
    let pass =""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*_+=`'"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
    }
    //read purpose
    setpassword(pass)
  },[length,numAllowed,charAllowed,setpassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordgenerator()
  },[length,numAllowed,charAllowed,passwordgenerator])


  return (
    
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 '>
        <h1 className='text-white text-center my-3'>PASSWORD GENERATOR</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"//object property creation
          value={password}
          className='outline-none w-full py-1 px-3 bg-white'
          placeholder='password'
          readOnly
          ref={passwordRef}
           />
           <button onClick={copyPasswordToClipboard}
           className='outline-none bg-blue-700 text-white px-5 py-4 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>length: {length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numAllowed}
            id='numberInput'
            onChange={()=>{
              setnumAllowed((prev)=>!prev);
            }}
            
            />
            <label htmlFor='numberInput'>numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={()=>{
              setcharAllowed((prev)=>!prev);
            }}
            
            />
            <label htmlFor='characterInput'>characters</label>
            </div>
        </div>
      </div>
    
  )
}

export default App
