import { WebBundlr } from "@bundlr-network/client";
import { ethers } from "ethers";
import { useProvider, useSigner } from "wagmi";

import fileReaderStream from "filereader-stream";
import { fetchSigner } from "wagmi/actions";

const uploadMetadata = async (data) => {
	const signer = await fetchSigner();
	const provider = signer?.provider;
	// use method injection to add the missing function
	provider.getSigner = () => signer;
	// create a WebBundlr object
	const bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", provider, {
		providerUrl: "https://matic-mumbai.chainstacklabs.com",
	});

	await bundlr.ready();
	const serialized = JSON.stringify(data);
	const tx = await bundlr.upload(serialized, {
		tags: [{ name: "Content-Type", value: "application/json" }],
	});

	console.log(`Upload success content URI= https://arweave.net/${tx.id}`);
	//setMessage("Metadata uploaded ...");

	return `https://arweave.net/${tx.id}`;
};

export const upload = async (data) => {
	console.log("upload function: upload data=", data);

	// data.image = data.content.imageUrl;
	// data.imageMimeType = data.content.fileType;
	// data.media = [
	// 	{
	// 		item: data.content.imageUrl,
	// 		type: data.content.fileType,
	// 	},
	// ];
	// // make content null since we have media
	// data.content = null;
	data.appId = "viewfrommywindow";
	console.log("upload function2: upload data=", data);

	const metadataUrl = await uploadMetadata(data);
	console.log("metadataUrl=", metadataUrl);
	return metadataUrl;
};
