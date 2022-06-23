import React from 'react'
import Footer from '../home/footer/Footer'
import Topbar from '../home/topbar/Topbar'
import Vestcont from './vest-content/Vestcont'
import './vest.css'

export default function Vest() {
  return (
    <>
    <div className="vest">

    <Topbar/>
    <Vestcont/>
    
    <Footer/>
    </div>
    </>
  )
}
