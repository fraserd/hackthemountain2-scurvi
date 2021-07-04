import React, { MouseEvent } from 'react';
import './PinMap.css';
import startPinImport from "../images/start pin.png"
import middlePinImport from "../images/inbetween pin.png"
import endPinImport from "../images/end pin.png"
import {AppStateAccessor, PinType, Pin, ResultSet, Coordinate} from "../Interfaces"
import CanvasUtil from "../CanvasUtil";

export interface PinResultsProp extends AppStateAccessor {
    pins: Pin[]
}

export class PinResults extends React.Component<PinResultsProp, any> {
    private canvasRef = React.createRef<HTMLCanvasElement>();

    placeAllPins = (pins: Pin[]) => {
        pins.forEach( (p) => {
           this.placePin(p);
        } );
    }

    placePin = (pin: Pin) => {
        let pinImageSrc : string;

        switch (pin.type) {
            case PinType.Start:
                pinImageSrc = startPinImport;
                break;
            case PinType.Middle:
                pinImageSrc = middlePinImport;
                break;
            case PinType.End:
                pinImageSrc = endPinImport;
                break;
        }

        let current = this.canvasRef.current;
        if (!current)
            return;

        let context = current.getContext('2d');
        if (!context)
            return;

        CanvasUtil.displayPin(context, pin.coord, pinImageSrc);
    }

    componentDidMount = () => {
        this.placeAllPins(this.props.pins);
    }

    render = () => {
        const w = document.body.clientWidth;
        const h = document.body.clientHeight;

        return (
            <canvas width={w} height={h} ref={this.canvasRef}/>
        );
    }
}
