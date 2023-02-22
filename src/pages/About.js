import React from "react";

const About = () => {
	return (
		<div name="createProfile" className="w-full h-screen text-text pt-20">
			<div className="flex flex-col ml-20 mr-20 text-white">
				<h2 className="text-4xl font-display text-blue-500">About:</h2>

				<p>
					A long, long time ago there was a hashtag trending on Instagram titled #ViewFroMyWindow.
					At a time when Instagram was all about showing your most polished side, #ViewFroMyWindow
					was all about showing just whatever you were looking at. Your view might be the beach,
					or it might be a car on blocks, it might be beautiful, it might be banal ... the point
					wasn't to impress with your amazing view, the point was to feel closer to people by
					seeing the world through their eyes.
				</p>

				<p className="bg-black mt-5">
					{" "}
					When I started thinking about a project I could use in some online workshops, I somehow
					wandered back to #ViewFroMyWindow. I got to thinking about how people in this workshop
					would be spread across the world, in condos, in houses, in cities and in the
					countryside. Sometimes we'll know each other's names, sometimes they'll just be anon and
					a photo. But if we each share our view, we might end up feeling just a little bit
					closer.
				</p>

				<p className="bg-black mt-5">
					My goal with this project is to teach the workshop multiple times, each time using the
					same code base so that our community of students grows and we each keep sharing our
					views.
				</p>
				<p className="bg-black mt-5">
					I will continue hosting the UI on my site at{" "}
					<a href="https://myview.luke.gallery" target="_blank" className="underline">
						https://myview.luke.gallery
					</a>
					, however as the data exists in Bundlr and on Lens, anyone can build a new UI that pulls
					from the same dataset. Anyone can add new features, anyone can experiment and take it in
					new directions.
				</p>
				<p className="bg-black mt-5">
					<h2 className="text-4xl font-display text-blue-500">Links:</h2>
					<ul className="list-disc">
						<li className="ml-5">
							<a
								href="https://github.com/lukecd/view-from-my-window"
								target="_blank"
								className="underline"
							>
								GitHub
							</a>
						</li>
						<li className="ml-5">
							<a href="https://bundlr.network/" target="_blank" className="underline">
								Bundlr
							</a>
						</li>
						<li className="ml-5">
							<a href="https://www.lens.xyz/" target="_blank" className="underline">
								Lens Protocol
							</a>
						</li>
					</ul>
				</p>
			</div>
		</div>
	);
};

export default About;
