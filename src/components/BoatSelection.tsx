import React from 'react'
import {AppStateSetter} from "../Interfaces";
import {BoatBase, Barquentine, Frigate, RowBoat, BoatSpeeds} from "../Ships";
import List from "./List";
import Boat from "./Boat";

interface BoatSelectionProperties extends AppStateSetter {
}

class BoatSelection extends React.Component<BoatSelectionProperties, any> {
  constructor(props: BoatSelectionProperties) {
    super(props);
  }

  boats = () => {
    return [new RowBoat(), new Frigate(), new Barquentine()]
  }

  factory = (boat: BoatBase): JSX.Element => {
    switch (boat.type) {
      case BoatSpeeds.RowBoat:
        return <Boat speed={boat.speed} type={boat.type} sprite={boat.sprite}/>
      case BoatSpeeds.Frigate:
        return <Boat speed={boat.speed} type={boat.type} sprite={boat.sprite}/>
      case BoatSpeeds.Barquentine:
        return <Boat speed={boat.speed} type={boat.type} sprite={boat.sprite}/>
    }
  }

  render = () => {
    return (
      <div>
        <p>Choose your boat or enter typical travel rate in knots</p>
        <List items={this.boats()} factory={this.factory} />
      </div>
    )
  }
}

export default BoatSelection