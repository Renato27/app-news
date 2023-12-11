import React from 'react'
import './HeaderSection.css'
import VideoComponent from './VideoComponent'

function HeaderSection({providerImg}: {providerImg: string}) {
  return (
   <div className="header-container">
        {
          providerImg ? (
            <img src={providerImg} alt="provider" className="header__img"/>
          ) : (
            <VideoComponent/>
          )
        }
       
        <div className="header-btns">
        </div>
   </div>
  )
}

export default HeaderSection