import { Module } from 'react-vr-web';

export default class BridgeModule extends Module {
  constructor(callback) {
    super('BridgeModule');
    this.bridgeName = 'BrowserBridge';
    this.callback = callback;
  }

  init(rnctx) {
    this.rnctx = rnctx;
  }

  setCallback(callback){
    this.callback = callback;
  }

  sendMessageToMainThread(message) {
    this.rnctx.callFunction(this.bridgeName, 'notifyEvent', [message]);
  }

  sendMessageToWebWorker(message) {
    this.callback ? this.callback(message) : console.error('react-vr-bridge', 'You forgot to pass callback function!');
  };
}
