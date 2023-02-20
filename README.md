# View From My Window

A long, long time ago there was a hashtag trending on Instagram titled #ViewFroMyWindow. At a time when Instagram was all about showing your most polished side, #ViewFroMyWindow was all about showing just whatever you were looking at. Your view might be the beach, or it might be a car on blocks, it might be beautiful, it might be banal ... the point wasn't to impress with your amazing view, the point was to feel closer to people by seeing the world through their eyes.

When I started thinking about a project I could use in some online workshops, I somehow wandered back to #ViewFroMyWindow. I got to thinking about how people in this workshop would be spread across the world, in condos, in houses, in cities and in the countryside. Sometimes we'll know each other's names, sometimes they'll just be anon and a photo. But if we each share our view, we might end up feeling just a little bit closer.

My goal with this project is to teach the workshop multiple times, each time using the same code base so that our community of students grows and we each keep sharing our views.

I will continue hosting the UI on my site at https://myview.luke.gallery, however as the data exists in Bundlr and on Lens, anyone can build a new UI that pulls from the same dataset. Anyone can add new features, anyone can experiment and take it in new directions.

## Project Setup

There are two branches in this project

-   main: Full source code
-   framework: UI-only source code

As the goal of this project is to teach using Bundlr and Lens to create an image-based social network, there is very little coverage of how the UI was built. I recommend forking the "framework" branch and integrating Bundlr and Lens as you follow along.

If you do want to start from scratch, perhaps to challenge yourself to design a new UI, the following steps will guide you through setting up a new project.

### React

```console
mkdir view-from-my-window
cd view-from-my-window
npx create-react-app .
npm install react-router-dom
npm install filereader-stream
```

### Tailwind

https://tailwindcss.com/docs/guides/create-react-app

```console
npm install -D tailwindcss
npx tailwindcss init
```

Change your `tailwind.config.js` to match:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
};
```

Change your `index.css` to match:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Lens

```console
npm install wagmi @lens-protocol/wagmi
```

### Bundlr

https://docs.bundlr.network/recipes/bundlr-react

```console
npm install @bundlr-network/client
npm install react-app-rewired
npm install --save-dev --force crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
npm install --force browserify-zlib path-browserify path
```

Create a file in your document root titled `config-overrides.js` and paste in the following.

```js
const webpack = require("webpack");
module.exports = function override(config) {
	const fallback = config.resolve.fallback || {};
	Object.assign(fallback, {
		crypto: require.resolve("crypto-browserify"),
		stream: require.resolve("stream-browserify"),
		assert: require.resolve("assert"),
		http: require.resolve("stream-http"),
		https: require.resolve("https-browserify"),
		os: require.resolve("os-browserify"),
		url: require.resolve("url"),
		zlib: require.resolve("browserify-zlib"),
	});
	config.resolve.fallback = fallback;
	config.plugins = (config.plugins || []).concat([
		new webpack.ProvidePlugin({
			process: "process/browser",
			Buffer: ["buffer", "Buffer"],
		}),
	]);
	config.module.rules = [
		...config.module.rules,
		{
			test: /\.m?js/,
			resolve: {
				fullySpecified: false,
			},
		},
	];
	return config;
};
```

Open your `package.json` and change this

```json
"scripts": {
   "start": "react-scripts start",
   "build": "react-scripts build",
   "test": "react-scripts test",
   "eject": "react-scripts eject"
 },
```

to this.

```json
"scripts": {
   "start": "react-app-rewired start",
   "build": "react-app-rewired build",
   "test": "react-app-rewired test",
   "eject": "react-scripts eject"
},
```

## Assets Used

The following third-party assets and designs were used.

-   Spinning Earth (purchased)
    https://www.istockphoto.com/vector/earth-globe-map-turning-set-gm864531708-143362339
-   CSS stars https://www.youtube.com/watch?v=aywzn9cf-_U
