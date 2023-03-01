import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { LensConfig, staging } from "@lens-protocol/react";
import { LensProvider } from "@lens-protocol/react";
import { localStorage } from "@lens-protocol/react/web";

import Navbar from "./components/Navbar";
import SpaceBackground from "./components/SpaceBackground";
import MyView from "./pages/MyView";
import About from "./pages/About";
import EnjoyTheView from "./pages/EnjoyTheView";
import CreateProfile from "./pages/CreateProfile";

// By adding sources: ["viewfrommywindow"] to the config,
// I automatically restrict React hook queries to my app only
const lensConfig = {
	bindings: wagmiBindings(),
	environment: staging,
	sources: ["viewfrommywindow"],
	storage: localStorage(),
};

export default function App() {
	return (
		<>
			<SpaceBackground />
			<Navbar />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MyView />} />
					<Route path="/my-view" element={<MyView />} />
					<Route path="/enjoy-the-view" element={<EnjoyTheView />} />
					<Route path="/create-profile" element={<CreateProfile />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
