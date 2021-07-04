import React from 'react'
import './WorldMap.css'

export default class WorldMap extends React.Component {

  render() {
    return (
      <div className="worldMap">
        {this.props.children}
      </div>
    )
  }

}