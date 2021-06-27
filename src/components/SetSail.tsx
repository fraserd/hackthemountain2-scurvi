import React from 'react'
import ampersand from "./ampersand.png"
import './SetSail.css'

export default function SetSail() {
  return (
    <div className="setSail centre">
      <div className="cell">
        Set Sail
      </div>
      <div className="cell">
        <img className="ampersand" src={ampersand} alt="ampersand"/>
      </div>
      <div className="cell">
        Avoid Scurvy
      </div>
    </div>
  )
}
