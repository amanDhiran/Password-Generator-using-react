import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState("8")
  const [numbersAllowed, setNumbersAllowed] = useState("false")
  const [charsAllowed, setCharsAllowed] = useState("false")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(!numbersAllowed) str += "1234567890";
    if(!charsAllowed) str += "~!@#$%^&*()";
    
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
       pass += str.charAt(char)
    }

    setPassword(pass)
    
  },[length, numbersAllowed, charsAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() =>{
    passwordGenerator()
  }, [length,numbersAllowed,charsAllowed, passwordGenerator])

  return (
    <div className=' max-w-md mx-auto'>
      <h1 className=' text-2xl text-center mb-5'>Password Generator</h1>
      <div className='flex  justify-center gap-5'>
        <input 
        type="text" 
        className='w-full outline-none rounded-md p-2'
        readOnly
        value={password}
        ref={passwordRef}
        />
        <button 
          className='rounded-md bg-stone-950 text-white px-4 py-2'
          onClick={copyPasswordToClipboard}
        >Copy</button>
      </div>
      <div className='mt-3 flex gap-3 text-lg'>
        <div className='flex gap-2 '>
          <input type="range" 
          min={6} 
          max={28} 
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex gap-2'>
          <input 
          type="checkbox"
          onChange={() => {
            setNumbersAllowed((prev) => !prev)
          }} 
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex gap-2'>
          <input 
          type="checkbox"
          onChange={() => {
            setCharsAllowed((prev) => !prev)
          }}
           />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
