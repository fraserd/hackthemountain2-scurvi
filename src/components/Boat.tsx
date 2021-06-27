import React from "react";
import {BoatBase, BoatSpeeds} from "../Ships"
import barquentine from "../images/barquentine.png"
import frigate from "../images/frigate.png"
import rowboat from "../images/rowboat.png"

export default class Boat extends React.Component<BoatBase, any> {
  constructor(props: BoatBase) {
    super(props)
  }

  image = (sprite: keyof typeof BoatSpeeds): string => {
    switch (sprite) {
      case "RowBoat":
        return rowboat
      case "Frigate":
        return frigate
      case "Barquentine":
        return barquentine

    }
  }

  render = () => {
    return (
      <div>
        {this.props.sprite}
        speed: {this.props.speed} knots
        <img src={this.image(this.props.sprite)} alt={this.props.sprite} title={this.props.sprite}/>
      </div>
    )
  }
}