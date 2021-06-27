import React from 'react'
import './App.css'
import WorldMap from "./components/WorldMap";
import Logo from "./components/Logo";
import SetSail from "./components/SetSail";

function App() {
  return (
    <div className="App">
        <WorldMap>
            <Logo/>
            <SetSail/>
        </WorldMap>
    </div>
  )
}

export default App