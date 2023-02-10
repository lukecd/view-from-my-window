import React from "react";

const PictureDisplay = ({ imageUrl, id, postedBy }) => {
	console.log(id);

	return (
		<div className="flex flex-col justify-center bg-white border-white border-2 ">
			<a className="" key={id} href={imageUrl} target="_blank">
				<img id={id} src={imageUrl} width="400" />
			</a>
			<p className="self-end font-caption">View from {postedBy}'s window</p>
		</div>
	);
};

export default PictureDisplay;
