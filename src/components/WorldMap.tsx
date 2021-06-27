import React from 'react'
import './WorldMap.css'

export default function WorldMap(props: any /* TODO: find a better type */) {
  return (
    <div className="worldMap">
      {props.children}
    </div>
  )
}