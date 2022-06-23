import React from 'react'
import './homecontent.css'

export default function Homecontent() {
  return (
      <>
      <div className="bdycontent">

    <div className="main">
        

        <div className="txt">
            <h2>Create New Vesting Agreement</h2>
            <p>Easy way to create Smart Vesting Contracts for your investors.</p>

        </div>


        <div className="link">
            <p>
         
            <a href="/Main">Get started</a>

            </p>
        </div>
        
       
    </div>
    <div className="sidemain">
        <div className="app">
            <p>Already Vested? check dashboard

            </p>
            <div className="btn">
                <a href="/Claim">

                <button>Claim</button>
                </a>
            </div>
        </div>
    </div>
      </div>
      </>
  )
}
