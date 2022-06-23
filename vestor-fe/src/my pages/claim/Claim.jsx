import React from 'react'
import Footer from '../home/footer/Footer'
import Topbar from '../home/topbar/Topbar'
import Claimcnt from './claimcnt/Claimcnt'
import './claim.css'

export default function Claim() {
  return (
    <>
    <div className="claimmain">

    <Topbar/>
    <Claimcnt/>
    <Footer/>

    </div>

    </>
  )
}
