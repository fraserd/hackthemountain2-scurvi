import React from 'react'
import './App.css'
import WorldMap from "./components/WorldMap"
import Logo from "./components/Logo"
import SetSail from "./components/SetSail"
import Page from "./Page";
import BoatSelection from "./components/BoatSelection";
import {PinMap} from "./components/PinMap"
import Pane from "./components/Pane";
import TripResults from "./components/TripResults"
import {AppState, AppData} from "./Interfaces";
import {PinResults} from "./components/PinResults";

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      page: Page.Title,
      data: {
        speed: 0,
        pinData: [],
        results: {
          days: 0,
          limes: 0,
          lemons: 0,
          oranges: 0,
        }
      }
    }
  }

  setAppData = (page: Page, data: AppData) => {
    this.setState({ page: page, data: data })
  }

  getAppData = (): AppState => this.state

  render = () => {
    switch(this.state.page) {
      case Page.Title:
        return (
          <div className="App font-main citrus-blue">
            <WorldMap>
              <Logo/>
              <Pane width={345} height={140}>
                <SetSail appStateSetter={this.setAppData} appStateGetter={this.getAppData}/>
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
                <BoatSelection appStateSetter={this.setAppData} appStateGetter={this.getAppData}/>
              </Pane>
            </WorldMap>
          </div>
        )
      case Page.RouteSelection:
        return (
          <div className="App">
            <WorldMap>
              <Pane top={0} left={0} width={100} height={40} transparent>
                <Logo small/>
              </Pane>
              <PinMap appStateSetter={this.setAppData} appStateGetter={this.getAppData}/>
            </WorldMap>
          </div>
        )
      case Page.Results:
        const results = this.state.data.results;
        return (
            <div className="App">
              <WorldMap>
                <Pane top={0} left={0} width={100} height={40} transparent>
                  <Logo small/>
                </Pane>
                <PinResults appStateSetter={this.setAppData} appStateGetter={this.getAppData} pins={this.state.data.pinData} />
                <Pane top={300} left={600} width={600} height={400} transparent>
                  <TripResults days={results.days} limes={results.limes} lemons={results.lemons} oranges={results.oranges} />
                </Pane>
              </WorldMap>
            </div>
        )
    }
  }
}

export default App
