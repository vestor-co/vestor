import React from 'react'
import { useState } from 'react'
import './claimcnt.css'

export default function Claimcnt() {
  const [token , setToken] = useState(["name"])

  const [remainToken, setRemainTokens] = useState(5000)
 
  return (
    <>
    <div className="mainclaim">
      

      <div className="claimcnt">
       <div className="tkninfo">
 
        <div className="heads">
         <h4>Token Name</h4>
         <h4>Token remaining</h4>
        </div>
        <div className="tknvalue">
 
         <p>{token}</p>
         <p>{remainToken}</p>
        </div>
       </div>
       <div className="claim-btn">
         <button className='claim' >claim
         </button>
       </div>
 
      </div>
 
      
      
 
     </div>
    </>
  )
}
