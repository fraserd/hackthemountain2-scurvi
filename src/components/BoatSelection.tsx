import React from 'react'
import {AppStateSetter} from "../Interfaces";

interface BoatSelectionProperties extends AppStateSetter {}

class BoatSelection extends React.Component<BoatSelectionProperties, any> {
  constructor(props: BoatSelectionProperties) {
    super(props);
  }

  render = () => {
    return (
      /* TODO: build this UI */
      <div>Choose your boat or enter typical travel rate in knots</div>
    )
  }
}

export default BoatSelection