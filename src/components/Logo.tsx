import React from 'react'
import logo from "../images/scurvy logo.png"

export default class Logo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render = () => {
    return (
      <img src={logo} alt="scurvi logo"/>
    )
  }
}