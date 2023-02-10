import "../index.css";

import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

/**
 * @returns Top navigation bar
 */
const Navbar = () => {
	return (
		<div className="fixed w-full h-[80px] flex justify-center items-center px-4 bg-primary text-text">
			{/* desktop menu */}
			<ul className="flex ">
				<li className="mt-2">
					<a
						href="/my-view"
						className="bg-white  border-2 px-4 py-2 mx-1 font-bold text-black"
						duration={500}
					>
						my view
					</a>
				</li>
				<li className="mt-2">
					<a
						href="/enjoy-the-view"
						className="bg-white border-2 px-4 py-2 mx-1 font-bold text-black"
						duration={500}
					>
						enjoy the view
					</a>
				</li>
				<li className="mt-2">
					<a
						href="/create-profile"
						className="bg-white border-2 px-4 py-2 mx-1 font-bold text-black"
						to=""
						offset={-100}
						duration={500}
					>
						create profile
					</a>
				</li>{" "}
				<li className="self-end"></li>
			</ul>
		</div>
	);
};

export default Navbar;
