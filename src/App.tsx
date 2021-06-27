import React from 'react'
import './App.css'
import WorldMap from "./components/WorldMap"
import Logo from "./components/Logo"
import SetSail from "./components/SetSail"
import Page from "./Page";

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
      case Page.Input:
        /* TODO: write the input page return statement */
        break;
      case Page.Results:
        /* TODO: write the results page return statement */
        break;
    }
  }
}

export default App