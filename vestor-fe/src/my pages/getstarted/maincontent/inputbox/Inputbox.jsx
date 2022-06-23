import React from 'react'
import { useState } from 'react'
import './inputbox.css'

export default function Inputbox() {
  const [adress , setAdress] = useState('')
  const [project , setProject] = useState('')
  const [description , setDescription] = useState('')

  const [show, setShow] = useState(false)

  const handleSubmit = e =>{
    e.preventDefault();
    const info={ adress , project, description};

    console.log(info);
  }
  return (
    <div className="inptbox">
      <div className="cntnt">
        <form onSubmit={handleSubmit}>
          <label >Token Adress:</label>
          <input 
          type="text" 
          required
          value={adress}
          onChange ={(e) => setAdress(e.target.value)}
          />
           <label >Project Name:</label>
          <input 
          type="text" 
          required
          value={project}
          onChange={(e) => setProject(e.target.value)}
          />
        
        <label >Description:</label>
          <textarea name="" id="" cols="80" rows="10"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          ></textarea>
      <div onClick={() =>setShow(true)} className="nxt">
        <button>submit</button>
      </div>
        </form>
  
      {/* <p>{adress}</p>
      <p>{project}</p>
      <p>{description}</p> */}
      
    {

      show?<button className='nxtt'>

      <a href="/Vest">Next</a>
      </button>:null
      }
    


      </div>

    </div>
  )
}

