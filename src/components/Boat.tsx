import React, {HTMLAttributes} from "react";
import {BoatBase, BoatSpeeds} from "../Ships"
import barquentine from "../images/barquentine.png"
import frigate from "../images/frigate.png"
import rowboat from "../images/rowboat.png"

interface ClickEventHandler {
  clickEventHandler: (speed: number) => void
}

export default class Boat extends React.Component<BoatBase & ClickEventHandler, any> {
  constructor(props: BoatBase & ClickEventHandler) {
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
      <button onClick={(e) => this.props.clickEventHandler(this.props.speed)}>
        <img
          className="icon-large"
          src={this.image(this.props.sprite)}
          alt={this.props.sprite}
          title={`${this.props.sprite} - speed: ${this.props.speed} knots`}
        />
      </button>
    )
  }
}