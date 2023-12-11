import React from 'react'
import './HeaderSection.css'
import VideoComponent from './VideoComponent'

function HeaderSection() {
    console.log("HeaderSection")
  return (
   <div className="header-container">
        <VideoComponent/>
        <div className="header-btns">
        </div>
   </div>
  )
}

export default HeaderSection