import React from "react";
import "./Pane.css"

type PaneProperties = FixedPane | FloatingPane

interface FixedPane extends Dimensions, CommonPane {
  top?: number
  left?: number
  bottom?: number
  right?: number
}

interface FloatingPane extends Dimensions, CommonPane {

}

interface CommonPane {
  transparent?: boolean
}

interface Dimensions {
  width: number
  height: number
}

export default class Pane extends React.Component<PaneProperties, any> {
  constructor(props: PaneProperties) {
    super(props);
  }

  render = () => {
    let style: PaneProperties = {
      width: this.props.width,
      height: this.props.height
    }

    let classes = "pane"
    if("top" in this.props || "bottom" in this.props)
    {
      classes += " fixed"
      style = {...style, ...{ top: this.props.top, bottom: this.props.bottom, left: this.props.left, right: this.props.right }}
    }
    else
      classes += " floating"
    if(this.props.transparent)
      classes += " transparent"

    return (
      <div className={classes} style={style}>
        {this.props.children}
      </div>
    )
  }
}