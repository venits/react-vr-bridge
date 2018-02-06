import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';

class BrowserBridge {
  setListener(listener) {
    this.listener = listener;
  }

  notifyEvent(name) {
    this.listener ? this.listener(name) : console.error('react-vr-bridge', 'You forgot to set listener for BrowserBridge!');
  }
}

const browserBridge = new BrowserBridge();
BatchedBridge.registerCallableModule(BrowserBridge.name, browserBridge);

export default browserBridge;
