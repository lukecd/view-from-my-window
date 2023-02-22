import React, { useState, useEffect } from "react";
import { useExplorePublications } from "@lens-protocol/react";
import PictureDisplay from "../components/PictureDisplay";
const EnjoyTheView = () => {
	const { data: publications, loading, hasMore, next } = useExplorePublications();
	const [images, setImages] = useState([]);

	useEffect(() => {
		if (publications) {
			const urlList = [];
			for (let i = 0; i < publications.length; i++) {
				console.log(publications[i]);
				urlList.push({
					handle: publications[i].profile.handle,
					url: publications[i].metadata.media[0].original.url,
				});
			}
			setImages(urlList);
		}
	}, [publications]);

	return (
		<div name="enjoyTheView" className="w-full h-screen text-text pt-20">
			<div className="flex flex-col items-center w-full h-full pt-10 ">
				<div className="pl-5">
					<div className="text-left pb-8">
						<p className="text-6xl font-display text-blue-500">Nice View, Huh?</p>
						<div className="flex flex-row flex-wrap gap-2 mt-3">
							{images.map((image, id) => {
								return (
									<PictureDisplay id={id} imageUrl={image.url} postedBy={image.handle} />
								);
							})}
						</div>
					</div>
				</div>

				<div className="pl-5 pr-5 w-full "></div>
			</div>
		</div>
	);
};

export default EnjoyTheView;
