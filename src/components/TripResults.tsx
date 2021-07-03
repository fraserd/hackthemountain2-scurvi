import React from 'react'
import './TripResults.css';

interface TripResultsProperties {
    days: number
    limes: number
    lemons: number
    oranges: number
}

export default class TripResults extends React.Component<TripResultsProperties, any> {
    render = () => {
        return (
            <div id="TripResults">
                <div>Your journey will take <b>{this.props.days}</b> days</div>
                <div>You will need</div>
                <div><b>{this.props.limes}</b> limes</div>
                <div>or</div>
                <div><b>{this.props.lemons}</b> lemons</div>
                <div>or</div>
                <div><b>{this.props.oranges}</b> oranges</div>
                <div>per person</div>
            </div>
        )
    }
}
