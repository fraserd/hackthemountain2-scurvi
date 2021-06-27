import React from 'react'
import ampersand from "../images/ampersand.png"
import './SetSail.css'
import Page from "../Page";

interface SetSailProps {
  appStateSetter: (page: Page) => void
}

export default class SetSail extends React.Component<SetSailProps, any> {
  constructor(props: SetSailProps) {
    super(props);
  }

  setSail = (p1: React.MouseEvent<HTMLDivElement>) => {
    this.props.appStateSetter(Page.Input)
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