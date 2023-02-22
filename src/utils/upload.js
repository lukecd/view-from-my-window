import { WebBundlr } from "@bundlr-network/client";
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

	return `https://arweave.net/${tx.id}`;
};

// upload metadata automatically created by React hook
export const upload = async (data) => {
	// hack to add appid
	data.appId = "viewfrommywindow";
	const metadataUrl = await uploadMetadata(data);
	console.log("metadataUrl=", metadataUrl);
	return metadataUrl;
};
