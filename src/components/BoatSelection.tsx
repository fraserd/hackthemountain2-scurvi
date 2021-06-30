import React from 'react'
import {AppStateAccessor} from "../Interfaces";
import {Barquentine, BoatBase, Frigate, RowBoat} from "../Ships";
import List from "./List";
import Boat from "./Boat";
import Page from "../Page";
import scurviBoat from "../images/scurvi boat.png"

interface BoatSelectionProperties extends AppStateAccessor {
}

interface BoatSelectionState {
  speed?: number
}

class BoatSelection extends React.Component<BoatSelectionProperties, BoatSelectionState> {
  constructor(props: BoatSelectionProperties) {
    super(props);
    this.state = { }
  }

  boats = () => [new RowBoat(), new Frigate(), new Barquentine()]

  factory = (boat: BoatBase): JSX.Element =>
    <Boat
      speed={boat.speed}
      type={boat.type}
      sprite={boat.sprite}
      clickEventHandler={(speed) => this.setState({speed: speed})}/>

  render = () => {
    let hasValue: boolean = false, speed: number, speedString: string = ''
    if (this.state.speed !== undefined && this.state.speed > 0)
    {
      hasValue = true
      speed = this.state.speed
      speedString = `${speed}`
    }

    return (
      <div>
        <p>Enter typical travel rate in knots</p>
        <input value={speedString} onChange={e => this.setState({ speed: parseInt(e.target.value) })}/>
        <button
          disabled={!hasValue}
          onClick={() => this.props.appStateSetter(Page.RouteSelection, {...this.props.appStateGetter().data, ...{speed: speed}}  )}
        >
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