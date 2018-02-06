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
Next in our **init()** function at the beginning put this line:
 ```js
    const bridgeModule = new BridgeModule(messageReceiver);
 ```
 Also at the end of **init()** function just before **vr.start()** put this line:
 ```js
    bridgeModule.init(vr.rootView.context);
    vr.start();
    return vr;
  }
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

### Sending messages from Web Worker to Main Thread

1.  In **index.vr.js** (or other place from where you want to receive messages):
*Add those lines at the beginning of the file:*
```js
    import { BrowserBridge } from 'react-vr-bridge';
```

*Now we have to set **listener** that will be receiving messages from Web Worker.
In my case this line is in **constructor()***: 
```js
    BrowserBridge.setListener(message => console.warn(message));
```

2.  In **vr/client.js** at this point you should have this class imported: 
 ```js
    import { BridgeModule } from 'react-vr-bridge'
 ```
We will be using it to send messages to Main Thread. 
*To test if everything works we can put this code somewhere in **init()** function:*
```js
    setTimeout(() => {
        bridgeModule.sendMessage('test message');
    }, 3000);
```
*After 3 seconds after your listener should fire up with your message.*

**And that's all! :)**
