import React from 'react'
import ampersand from "../images/ampersand.png"
import './SetSail.css'
import Page from "../Page"
import {AppStateSetter} from "../Interfaces"

interface SetSailProperties extends AppStateSetter {}

export default class SetSail extends React.Component<SetSailProperties, any> {
  constructor(props: SetSailProperties) {
    super(props);
  }

  setSail = (p1: React.MouseEvent<HTMLDivElement>) => {
    this.props.appStateSetter(Page.BoatSelection)
  }

  render = () => {
    return (
      <div className="setSail centre" onClick={this.setSail}>
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
}