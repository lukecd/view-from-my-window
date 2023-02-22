import React, { useRef, useState, useEffect } from "react";
import EarthSprite from "../assets/earth-4x4.png"; // 16 frames, 4x4

const Earth = (props) => {
	const canvasRef = useRef(null);
	const [sprite, setSprite] = useState();
	const [frameWidth, setFrameWidth] = useState();
	const [frameHeight, setFrameHeight] = useState();
	const [frameIndex, setFrameIndex] = useState(0);

	const spriteSheetWidth = 1176;
	const spriteSheetHeight = 1176;
	const spriteSheetRows = 4;
	const spriteSheetCols = 4;
	const [spritePixels, setSpritePixels] = useState([]);

	const canvasWidth = 600;
	const canvasHeight = 600;

	const draw = (ctx, frameCount) => {
		if (frameCount % 15 === 0) {
			setFrameIndex(frameIndex + 1);
		}
		if (frameIndex >= spritePixels.length) setFrameIndex(0);
		if (sprite) {
			let localIndex = frameIndex;
			if (localIndex >= spritePixels.length) localIndex = 0;

			if (props.animate === false) localIndex = 0;

			// clear
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);

			// draw the planet
			ctx.drawImage(
				sprite,
				spritePixels[localIndex].x + 0,
				spritePixels[localIndex].y + 0,
				frameWidth,
				frameHeight,
				0,
				0,
				canvasWidth,
				canvasHeight,
			);

			// create the outerglow
			// ctx.beginPath();
			// ctx.arc(canvasWidth / 2, canvasWidth / 2, frameWidth, 0, 2 * Math.PI);
			// // ctx.strokeStyle = "#00ff00";
			// // ctx.lineWidth = 1;
			// ctx.shadowColor = "#00ff00";
			// ctx.shadowBlur = 40;
			// ctx.shadowOffsetX = 0;
			// ctx.shadowOffsetY = 0;
			// ctx.stroke();
		}
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		const earthSprite = document.getElementById("sprite");
		setSprite(earthSprite);
		let frameCount = 0;
		let animationFrameId;

		const render = () => {
			frameCount++;
			draw(context, frameCount);
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [draw]);

	// setup our coordinate
	useEffect(() => {
		const xStep = spriteSheetWidth / spriteSheetCols;
		const yStep = spriteSheetHeight / spriteSheetRows;
		const spriteCoordinateBuilder = [];
		for (let x = 0; x < spriteSheetWidth; x += xStep) {
			for (let y = 0; y < spriteSheetHeight; y += yStep) {
				spriteCoordinateBuilder.push({ x: x, y: y });
			}
		}
		setSpritePixels(spriteCoordinateBuilder);

		setFrameWidth(xStep);
		setFrameHeight(yStep);
		console.log(spriteCoordinateBuilder);
	}, []);

	return (
		<div>
			<img
				id="sprite"
				width={spriteSheetWidth}
				height={spriteSheetHeight}
				className="hidden"
				src={EarthSprite}
			/>
			<canvas ref={canvasRef} {...props} width={canvasWidth} height={canvasHeight} />
		</div>
	);
};

export default Earth;
