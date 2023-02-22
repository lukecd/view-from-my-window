import React, { useState } from "react";
import { WebBundlr } from "@bundlr-network/client";
import fileReaderStream from "filereader-stream";
import Earth from "../components/Earth";
import pica from "pica";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
	ContentFocus,
	CollectPolicyType,
	ReferencePolicy,
	useCreatePost,
	useActiveProfile,
	useWalletLogin,
} from "@lens-protocol/react";
import { upload } from "../utils/upload";
import { fetchSigner } from "wagmi/actions";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const MyView = () => {
	const [message, setMessage] = useState("");
	const [animate, setAnimate] = useState(false);

	const [fileToUpload, setFileToUpload] = useState();
	const [fileType, setFileType] = useState();

	const { login, error: loginError, isPending: loginPending } = useWalletLogin();
	const { data: profile, loading: profileLoading } = useActiveProfile();
	const { create, error: postError, isPending: postPending } = useCreatePost({ profile, upload });

	const { isConnected } = useAccount();
	const { disconnectAsync } = useDisconnect();

	const { connectAsync } = useConnect({
		connector: new InjectedConnector(),
	});

	const handleFile = async (e) => {
		setMessage("");
		const newFiles = e.target.files;
		if (newFiles.length === 0) return;

		setFileToUpload(newFiles[0]);
		setFileType(newFiles[0]["type"]);
	};

	// Written my Professor ChatGPT :)
	const compressImage = async (file, maxSize) => {
		const image = new Image();
		image.src = URL.createObjectURL(file);

		return new Promise((resolve, reject) => {
			image.onload = async () => {
				const canvas = document.createElement("canvas");
				const width = image.width;
				const height = image.height;

				if (width > maxSize || height > maxSize) {
					const scale = Math.min(maxSize / width, maxSize / height);
					canvas.width = width * scale;
					canvas.height = height * scale;
				} else {
					canvas.width = width;
					canvas.height = height;
				}

				const picaInstance = pica();
				const result = await picaInstance.resize(image, canvas);

				result.toBlob(async (blob) => {
					const compressedFile = new File([blob], file.name, {
						type: file.type,
						lastModified: Date.now(),
					});
					resolve(compressedFile);
				}, file.type);
			};

			image.onerror = () => {
				reject(new Error("Failed to load image"));
			};
		});
	};

	const uploadImage = async () => {
		console.log("uploadImage called ");

		const signer = await fetchSigner();
		const provider = signer?.provider;

		setMessage("");
		// create a WebBundlr object
		const bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", provider, {
			providerUrl: "https://matic-mumbai.chainstacklabs.com",
		});

		await bundlr.ready();

		try {
			console.log("fileToUpload BEFORE =", fileToUpload);
			const compressedFile = await compressImage(fileToUpload, 600);
			console.log("fileToUpload AFTER=", compressedFile);

			const dataStream = fileReaderStream(compressedFile);
			console.log(dataStream.size);
			const price = await bundlr.getPrice(dataStream.size);
			const balance = await bundlr.getLoadedBalance();
			if (price > balance) {
				setMessage(`Funding Upload ....`);
				await bundlr.fund(price);
			}

			setMessage(`Uploading File To Bundlr ....`);
			const tx = await bundlr.upload(dataStream, {
				tags: [{ name: "Content-Type", value: fileType }],
			});

			console.log(`File uploaded ==> https://arweave.net/${tx.id}`);
			setMessage(`File Uploaded ...`);

			return "https://arweave.net/" + tx.id;
		} catch (e) {
			setMessage("Upload error " + e.message);
			console.log("error on upload, ", e);
		}
	};

	const onSubmit = async () => {
		setAnimate(true);

		// STEP 1: Upload image
		const imageUrl = await uploadImage();
		const content = {
			imageUrl: imageUrl,
			fileType: fileType,
		};

		// STEP 2: Create post
		setMessage("Uploading metadata to Bundlr ...");
		await create({
			profileId: profile.id,
			image: imageUrl,
			imageMimeType: fileType,
			contentFocus: ContentFocus.IMAGE,
			locale: "en",
			collect: {
				type: CollectPolicyType.NO_COLLECT,
			},
			reference: ReferencePolicy.ANYBODY,
			media: [
				{
					url: imageUrl,
					mimeType: fileType,
				},
			],
		});

		setMessage("Post successful ...");
		setAnimate(false);
	};

	const doLogin = async () => {
		setAnimate(true);
		if (isConnected) {
			await disconnectAsync();
		}

		const { connector } = await connectAsync();

		if (connector instanceof InjectedConnector) {
			const signer2 = await connector.getSigner();
			await login(signer2);
		}

		if (!profile) {
			setMessage("You don't appear to have an active profile, create one first.");
		}
		setAnimate(false);
	};

	return (
		<div name="myView" className="w-full h-screen text-text pt-20 z-1">
			<div className="flex flex-col items-center justify-center">
				<Earth className="z-10" width="800" height="813" animate={animate} />

				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
					<h1 className="font-display text-8xl text-black">View</h1>
					<h2 className="font-display text-6xl text-black">From My</h2>
					<h1 className="font-display text-7xl text-black">Window</h1>
					<h2 className="font-display text-3xl text-black">Take A Pic, Click Upload</h2>

					<div className="flex flex-row justify-center">
						{isConnected && profile && (
							<>
								<input
									type="file"
									onChange={handleFile}
									className="pl-5 py-2  block text-sm text-white rounded-lg  bg-blue-700"
									multiple="single"
									name="files[]"
								/>
								<button
									className="bg-gradient-to-b from-cyan-500 to-blue-500 px-4 py-2 mx-1 font-bold text-white"
									onClick={() => onSubmit()}
								>
									Post
								</button>
							</>
						)}
						{!isConnected && <ConnectButton />}
						{isConnected && !profile && (
							<button
								className="bg-gradient-to-b from-cyan-500 to-blue-500 px-4 py-2 mx-1 font-bold text-white"
								onClick={() => doLogin()}
							>
								Login To Lens
							</button>
						)}
					</div>
					<h3 className="mt-2 font-mono text-sm bg-black text-white">{message}</h3>
				</div>

				<div className="absolute text-3xl text-amber-400 bottom-4 left-1/2 -translate-x-1/2"></div>
			</div>
		</div>
	);
};
export default MyView;
