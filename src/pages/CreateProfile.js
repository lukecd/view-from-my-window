import React, { useState, useRef, useEffect } from "react";

import fileReaderStream from "filereader-stream";
import Earth from "../components/Earth";
import { useActiveProfile, useWalletLogin, isValidHandle, useCreateProfile } from "@lens-protocol/react";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const CreateProfile = () => {
	const [message, setMessage] = useState("");
	const [animate, setAnimate] = useState("false");

	const [address, setAddress] = useState();

	const [handle, setHandle] = useState("");

	const { create, error, isPending } = useCreateProfile();
	const { login, error: loginError, isPending: isLoginPending } = useWalletLogin();
	const { isConnected } = useAccount();
	const { disconnectAsync } = useDisconnect();
	const { data, loading } = useActiveProfile();

	const { connectAsync } = useConnect({
		connector: new InjectedConnector(),
	});

	const doLogin = async () => {
		// only login if needed
		if (isConnected) {
			//return;
			await disconnectAsync();
		}

		const { connector } = await connectAsync();

		if (connector instanceof InjectedConnector) {
			const signer = await connector.getSigner();
			await login(signer);
		}
	};

	const createProfile = async (e) => {
		setMessage("Getting access token ...");
		await doLogin();

		if (data) {
			setMessage("You already have a profile associate with your wallet");
			return;
		}

		if (!handle) {
			setMessage("Pick a handle first");
			return;
		}
		setAnimate("true");

		if (!(await isValidHandle(handle))) {
			setMessage("Handle format invalid ...");
			setAnimate("false");
			return;
		}

		setMessage("Creating profile ...");

		try {
			await create(handle);
			setMessage("Profile created ...");
			console.log("error=", error);
			console.log("isValidHandle=", isValidHandle);
		} catch (err) {
			setMessage("Error creating profile ... " + err);
		}
		setAnimate("false");
	};

	return (
		<div name="createProfile" className="w-full h-screen text-text pt-20">
			<div className="flex flex-col items-center justify-center">
				<Earth className="" width="800" height="813" animate={animate} />
				<div className="absolute text-5xl text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
					<h1 className="font-display text-6xl text-black ">Want A Profile?</h1>
					<h2 className="font-display text-3xl text-black">Pick A Handle, Click Create</h2>

					<div className="flex flex-row ">
						<input
							className="w-2/3 px-1 py-1 bg-indigo-500 border-b text-black text-lg focus:outline-none"
							type="text"
							value={handle}
							onChange={(e) => setHandle(e.target.value)}
							placeholder="handle ..."
							aria-label="Lens Handle"
						/>
						<button
							onClick={createProfile}
							className="w-1/3 ml-5 bg-blue-700 text-white font-bold py-1 px-3 rounded-lg text-sm"
						>
							Create
						</button>
					</div>
					<h3 className="mt-2 font-mono text-sm text-white bg-black">{message}</h3>
				</div>
			</div>
		</div>
	);
};
export default CreateProfile;
