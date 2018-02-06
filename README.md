# React VR Bridge

Module for simple communication between Web Worker and Main UI Thread in React-VR.

## Installation 

```js
	npm i -s react-vr-bridge
```

## Usage

### Sending messages from Main Thread to Web Worker

1. In **vr/client.js** add following lines:
 ```js
	 import { BridgeModule } from 'react-vr-bridge'
 ```
Next in our init() function on the beginning:
 ```js
	 const bridgeModule = new BridgeModule(messageReceiver);
 ```
**messageReceiver** is our listener that will be receiving our messages from Main Thread.
*It can for example look like this:*
```js
	messageReceiver = (message) => {
	  console.warn('Message from Main Thread', message);
	};
```

2. In **index.vr.js** (or other place from where you want to send messages):
*Add those lines at the beginning of the file:*
```js
	import { NativeModules } from 'react-vr';
	const BridgeModule = NativeModules.BridgeModule;
```
*Now to send messages all you have to do is:*
```js
	BridgeModule.sendMessageToWebWorker('1234');
```

