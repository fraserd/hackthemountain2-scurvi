import React, { MouseEvent } from 'react';
import './PinMap.css';
import startPinImport from "../images/start pin.png"
import middlePinImport from "../images/inbetween pin.png"
import endPinImport from "../images/end pin.png"


interface ButtonProp {
	text: string;
	handleClick : React.MouseEventHandler<HTMLButtonElement>;
}

function Button(props: ButtonProp)
{
	return (
		<button type="button"
				id="doneButton"
				onClick={props.handleClick}>
			{props.text}
		</button>
	);
}

interface Coordinate {
	x: number;
	y: number;
}

function calculateDistance(c1: Coordinate, c2: Coordinate) {
	let a = c1.x - c2.x;
	let b = c1.y - c2.y;

	return Math.sqrt((a*a) + (b*b));
}

// knots to kilometers per hour
function knot2kph(knot: number) {
	return knot * 1.852;
}


function calculateTimeHours(km: number, knots: number) {
	let kph = knot2kph(knots);

	return km / kph;
}

/*
- humans require an average of 82.5mg of vitamin c per day but there is no real upper limit
- 1 100g orange = 53.2mg
- 1 100g lemon = 53mg
- 1 100g lime = 29.1mg
Frigate = 12 knots
Barquentine = 16 knots
Row boat = 2 knots
*/
function doYouGetScurvy(distance_km: number, boat_speed_knots: number, total_vit_c_milligrams: number) {

	const hours = calculateTimeHours(distance_km, boat_speed_knots);
	const days = hours / 24;

	const daily_vit_c_requirement = 82.5;	// milligrams

	const total_vit_c_requirement = days * daily_vit_c_requirement;

	if (total_vit_c_requirement <= total_vit_c_milligrams) {
		console.log("Arr, yer crew won't get scurvy.");
	} else {
		const delta = total_vit_c_requirement - total_vit_c_milligrams;

		if (delta <= (30 * daily_vit_c_requirement)) {
			console.log("Arr, you are malnurished but you won't see signs of scurvy.");
		} else if (delta <= (3 * 30 * daily_vit_c_requirement)) {
			console.log("Arr, your gums will bleed but you will likely live. Go eat an orange when you get ashore.");
		} else {
			console.log("Yar, you're done for.");
		}
	}
}



export default interface PinMapProp {
}


export default class PinMap extends React.Component {
	private canvasRef = React.createRef<HTMLCanvasElement>();
	private startPin? : Coordinate = undefined;
	private middlePin? : Coordinate = undefined;
	private endPin? : Coordinate = undefined;

	constructor(props: PinMapProp) {
		super(props);

		this.placePin = this.placePin.bind(this);
		this.calculateTotalDistance = this.calculateTotalDistance.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.getPins = this.getPins.bind(this);
	}

	getPins() {
		return [ this.startPin, this.middlePin, this.endPin ];
	}

	handleClick(event: MouseEvent) {
		const coord : Coordinate = {x: event.clientX, y: event.clientY};

		this.placePin(coord);
	}

	calculateTotalDistance() {
		if (!this.startPin || !this.middlePin || !this.endPin) {
			throw new Error("Can't calculate route distance unless all 3 pins are placed");
		}

		let distance = calculateDistance(this.startPin, this.middlePin);
		distance += calculateDistance(this.middlePin, this.endPin);

		return distance;
	}

	placePin(coord: Coordinate) {
		let pinImageSrc : string;

		const scaleFactor = 22;
		const scaledCoord : Coordinate = {x : coord.x * scaleFactor, y : coord.y * scaleFactor };

		// For now you must always place all three pins.
		if (!this.startPin) {
			this.startPin = scaledCoord;
			pinImageSrc = startPinImport;
		} else if (!this.middlePin) {
			this.middlePin = scaledCoord;
			pinImageSrc = middlePinImport;
		} else if (!this.endPin) {
			this.endPin = scaledCoord;
			pinImageSrc = endPinImport;
		} else {
			let totalDistance = this.calculateTotalDistance();

			const frigateKnots = 12;
			const orangeCount = 100;
			const orangeVitC = 53.2; // mg

			const totalVitC = orangeCount * orangeVitC;

			console.log("distance: ", totalDistance);
			console.log("boat type: frigate");
			console.log("orangeCount:", orangeCount);
			doYouGetScurvy(totalDistance, frigateKnots, totalVitC);

			return;	// Done adding pins.
		}

		let current = this.canvasRef.current;
		if (!current)
		{
			return;
		}

		let context = current.getContext('2d');
		let pinImage = new Image();
		pinImage.src = pinImageSrc;
		pinImage.onload = function() {
			if (context) {
				const image_width = 30;
				const image_height = 40;

				const rect = context.canvas.getBoundingClientRect();
				const x = coord.x - rect.left - (image_width / 2);
				const y = coord.y - rect.top - image_height;

				context.drawImage(pinImage, x, y, image_width, image_height);
			}
		}
		pinImage.onerror = function() {
			console.log("pinImage onerror", this.src);
		}
	}

	render() {
		let w = document.body.clientWidth;
		let h = document.body.clientHeight;

		return (
			<canvas id="pinMapCanvas" width={w} height={h} ref={this.canvasRef} onClick={this.handleClick}></canvas>
		);
	}
}




