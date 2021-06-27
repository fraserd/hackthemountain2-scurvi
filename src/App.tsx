import React from 'react'
import './App.css'
import WorldMap from "./components/WorldMap"
import Logo from "./components/Logo"
import SetSail from "./components/SetSail"
import Page from "./Page";
import BoatSelection from "./components/BoatSelection";
import PinMap from "./components/PinMap"
import Pane from "./components/Pane";

interface AppState {
  page: Page
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      page: Page.Title
    }
  }

  setPage = (page: Page) => {
    this.setState({ page: page })
  }

  render = () => {
    switch(this.state.page) {
      case Page.Title:
        return (
          <div className="App font-main citrus-blue">
            <WorldMap>
              <Logo/>
              <Pane width={345} height={140}>
                <SetSail appStateSetter={this.setPage}/>
              </Pane>
            </WorldMap>
          </div>
        )
      case Page.BoatSelection:
        return (
          <div className="App font-smaller citrus-navy">
            <WorldMap>
              <Pane top={0} left={0} width={100} height={40} transparent>
                <Logo small/>
              </Pane>
              <Pane width={600} height={400}>
                <BoatSelection appStateSetter={this.setPage}/>
              </Pane>
            </WorldMap>
          </div>
        )
      case Page.RouteSelection:
        return (
          <div className="App">
            <WorldMap>
              <PinMap/>
            </WorldMap>
          </div>
        )
      case Page.Results:
        /* TODO: write the results page return statement */
        break;
    }
  }
}

export default App
