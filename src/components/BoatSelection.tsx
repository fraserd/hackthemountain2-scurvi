import React from 'react'
import {AppStateSetter} from "../Interfaces";
import {Barquentine, BoatBase, Frigate, RowBoat} from "../Ships";
import List from "./List";
import Boat from "./Boat";
import Page from "../Page";
import scurviBoat from "../images/scurvi boat.png"

interface BoatSelectionProperties extends AppStateSetter {
}

interface BoatSelectionState {
  speed?: number
}

class BoatSelection extends React.Component<BoatSelectionProperties, BoatSelectionState> {
  constructor(props: BoatSelectionProperties) {
    super(props);
    this.state = { }
  }

  boats = () => {
    return [new RowBoat(), new Frigate(), new Barquentine()]
  }

  factory = (boat: BoatBase): JSX.Element => {
      return <Boat
        speed={boat.speed}
        type={boat.type}
        sprite={boat.sprite}
        key={boat.type}
        clickEventHandler={(speed) => this.setState({ speed: speed })}/>
  }

  render = () => {
    return (
      <div>
        <p>Enter typical travel rate in knots</p>
        <input value={this.state.speed} onChange={e => this.setState({ speed: parseInt(e.target.value) })}/>
        <button disabled={this.state.speed == undefined || this.state.speed <= 0} onClick={() => this.props.appStateSetter(Page.RouteSelection)}>
          <img className="icon" src={scurviBoat} alt="scurvi boat"/>
        </button>
        <p>or</p>
        <p>Choose a boat</p>
        <List items={this.boats()} factory={this.factory} horizontal />
      </div>
    )
  }
}

export default BoatSelection