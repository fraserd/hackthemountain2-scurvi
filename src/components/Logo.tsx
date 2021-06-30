import React from 'react'
import "./Logo.css"
import logo from "../images/scurvy logo.png"

interface LogoProperties {
  small?: boolean
}

export default class Logo extends React.Component<LogoProperties, any> {
  constructor(props: LogoProperties) {
    super(props);
  }
  render = () => {
    return (
      <img className={this.props.small ? "small" : ""} src={logo} alt="scurvi logo"/>
    )
  }
}