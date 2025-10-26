"use client"
import { CiSearch } from "react-icons/ci";
import React, { useState } from 'react'

function SearchInput({onInputChange}:{onInputChange:(inputValue:string)=>void}) {
    const [input, setInput] = useState("");

    const handleSubmit =(e:React.FormEvent)=>{
        onInputChange(input);
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder='search user...'/>
        <button type="submit">
            <CiSearch />
        </button>
        </form>
    </div>
  )
}

export default SearchInput