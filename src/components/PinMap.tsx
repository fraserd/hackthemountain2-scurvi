import React, { MouseEvent } from 'react';
import './PinMap.css';
import startPinImport from "../images/start pin.png"
import middlePinImport from "../images/inbetween pin.png"
import endPinImport from "../images/end pin.png"
import {AppStateAccessor, PinType, Pin, ResultSet, Coordinate} from "../Interfaces"
import Page from "../Page";
import CanvasUtil from "../CanvasUtil";

class TravelersMathHelper {

	static distance = (c1: Coordinate, c2: Coordinate) => {
		let a = c1.x - c2.x;
		let b = c1.y - c2.y;

		return Math.sqrt((a*a) + (b*b));
	}

	// knots to kilometers per hour
	static knots2kph = (knots: number) => knots * 1.852
}

interface CoordinatePair {
	screen_coord: Coordinate,
	km_coord: Coordinate
}

export interface PinMapProp extends AppStateAccessor {}

export class PinMap extends React.Component<PinMapProp, any> {
	private canvasRef = React.createRef<HTMLCanvasElement>();
	private startPin? : CoordinatePair = undefined;
	private middlePin? : CoordinatePair = undefined;
	private endPin? : CoordinatePair = undefined;

	handleClick = (event: MouseEvent) => {
		const c : Coordinate = {x: event.clientX, y: event.clientY};

		this.placePin(c);
	}

	calculateTotalDistance = () => {
		if (!this.startPin || !this.middlePin || !this.endPin) {
			throw new Error("Can't calculate route distance unless all 3 pins are placed.");
		}

		let distance = TravelersMathHelper.distance(this.startPin.screen_coord, this.middlePin.screen_coord);
		distance += TravelersMathHelper.distance(this.middlePin.screen_coord, this.endPin.screen_coord);

		return distance;
	}

	transitionToResults = () => {
		if (!this.startPin || !this.middlePin || !this.endPin) {
			throw new Error("Can't transition to results unless all 3 pins are placed.");
		}

		let pins : Pin[] = [
			{ coord: this.startPin.km_coord, type: PinType.Start },
			{ coord: this.middlePin.km_coord, type: PinType.Middle },
			{ coord: this.endPin.km_coord, type: PinType.End },
		];

		const distance_km = this.calculateTotalDistance();
		const speed_kph = TravelersMathHelper.knots2kph(this.props.appStateGetter().data.speed);
		const hours = distance_km / speed_kph;
		const days = Math.ceil(hours / 24);
		const daily_vitamin_c_requirement_mg = 82.5;
		const trip_vitamin_c_mg = days * daily_vitamin_c_requirement_mg;

		// Vitamin C in mg per 100mg
		// Source: `Foods and their Vitamin C content per 100 grams` https://en.wikipedia.org/wiki/Scurvy
		enum VitaminC_mg {
			Orange = 53.2,
			Lemon = 53,
			Lime = 29.1,
		}

		let results : ResultSet = {
			days: days,
			limes: Math.ceil(trip_vitamin_c_mg / VitaminC_mg.Lime),
			lemons: Math.ceil(trip_vitamin_c_mg / VitaminC_mg.Lemon),
			oranges: Math.ceil(trip_vitamin_c_mg / VitaminC_mg.Orange)
		};

		this.props.appStateSetter(Page.Results, { ...this.props.appStateGetter().data, pinData: pins, results: results });
	}

	placePin = (coord: Coordinate) => {
		let pinImageSrc : string;

		const scaleFactor = 22;	// TODO Dynamic scaling and resize events.
		const screenCoord : Coordinate = {x : coord.x * scaleFactor, y : coord.y * scaleFactor };
		const coordinatePair : CoordinatePair = { km_coord: coord, screen_coord: screenCoord };

		// For now you must always place all three pins.
		if (!this.startPin) {
			this.startPin = coordinatePair;
			pinImageSrc = startPinImport;
		} else if (!this.middlePin) {
			this.middlePin = coordinatePair;
			pinImageSrc = middlePinImport;
		} else if (!this.endPin) {
			this.endPin = coordinatePair;
			pinImageSrc = endPinImport;
		} else {
			this.transitionToResults();
			return;
		}

		let current = this.canvasRef.current;
		if (!current)
			return;

		let context = current.getContext('2d');
		if (!context)
			return;

		CanvasUtil.displayPin(context, coord, pinImageSrc);
	}

	render = () => {
		let w = document.body.clientWidth;
		let h = document.body.clientHeight;

		return (
			<canvas id="pinMapCanvas" width={w} height={h} ref={this.canvasRef} onClick={this.handleClick}/>
		);
	}
}
