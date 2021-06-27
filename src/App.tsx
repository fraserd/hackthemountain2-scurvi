import React from 'react'
import './App.css'
import WorldMap from "./components/WorldMap"
import Logo from "./components/Logo"
import SetSail from "./components/SetSail"
import Page from "./Page";
import BoatSelection from "./components/BoatSelection";
import PinMap from "./components/PinMap"

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
          <div className="App">
            <WorldMap>
              <Logo/>
              <SetSail appStateSetter={this.setPage}/>
            </WorldMap>
          </div>
        )
      case Page.BoatSelection:
        return (
          <div className="App">
            <WorldMap>
              <BoatSelection appStateSetter={this.setPage}/>
            </WorldMap>
          </div>
        )
      case Page.RouteSelection:
        return (
		  <div className="App">
			<WorldMap>
				<PinMap />
			</WorldMap>
		  </div>
		)
        break;
      case Page.Results:
        /* TODO: write the results page return statement */
        break;
    }
  }
}

export default App
