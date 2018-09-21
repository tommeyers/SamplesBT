async function onButtonClick() {
  let options = {};
    options.acceptAllDevices = true;
  try {
    log('Requesting Bluetooth Device...');
    log('with ' + JSON.stringify(options));
    const device = await navigator.bluetooth.requestDevice(options);
    log('> Name:             ' + device.name);
    log('> Id:               ' + device.id);
    log('> Connected:        ' + device.gatt.connected);
  } catch(error)  {
    log('Argh! ' + error);
  }
  
  
  //======================================================================
	var rxbuilder = '';
	function onBTReceive(info) {
		console.log('Received ' + info.data.byteLength + ' bytes of data: ' 
		       + convertArrayBufferToDumpString(info.data));
		var rxstring = convertArrayBufferToString(info.data);
		rxbuilder += rxstring;
		if (rxbuilder.charCodeAt(rxbuilder.length - 1) == 13) {
			var rxdata = rxbuilder.slice(0, -1);
			console.log('<< Received message: "' + rxdata + '"');
			rxbuilder = '';
		}
		else {
			console.log('Message is not terminated. Message so far is: "' + rxbuilder + '"');
		}
	}
    //======================================================================
	function onBTReceiveError(errorInfo) {
		console.log(errorInfo.errorMessage);
	}
    //======================================================================
	navigator.bluetoothSocket.onReceive.addListener(onBTReceive);
	navigator.bluetoothSocket.onReceiveError.addListener(onBTReceiveError);

}
