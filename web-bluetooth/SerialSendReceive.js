
function myGesture() {
    console.log("got form submit");
    console.log(navigator.bluetooth);
    event.stopPropagation();
    event.preventDefault();
    if (navigator.bluetooth) {
      console.log('we have bluetooth');
    } else {
        console.log("we don't have bluetooth");
    }
    startUp();
};

console.log('here1');
var devices          = {};
var btDeviceSelect   = document.querySelector('#btDeviceSelect');
var socketID         = 0;
var deviceArray      = {};
var device_names     = {};
var device_Addresses = {};
var deviceCount      = 0;
var deviceOffset     = 0;
var screenWidth = screen.availWidth;
var screenHeight = screen.availHeight;
console.log('here2');
var rxbuilder = '';
var addDeviceName = function(device) {
	deviceArray[deviceCount++] = device;
//  var btDeviceName = device.name;
//  document.querySelector('<option></option>').text(btDeviceName).appendTo(btDeviceSelect);
    document.querySelector('<option></option>').text(device.name).appendTo(btDeviceSelect);
}
var updateDeviceName = function(device) {
	console.log('  Have a device update - ' + device.name);
}
var removeDeviceName = function(device) {
	delete device_names[device.address];
}

document.querySelector('form').addEventListener('submit', function(event) {
    console.log("submit");
	navigator.bluetooth.startDiscovery(function() {
	        console.log('Starting Bluetooth Device discovery.');
	       // setTimeout(function() {  
	       //     navigator.bluetooth.stopDiscovery(function() {});
	       //     console.log('Finished Scanning for Bluetooth Devices.');
	       // }, 30000);
	});
	navigator.bluetooth.stopDiscovery(
	         function() {
	         console.log('Stopping Bluetooth Device discovery.');
			 }
	);       
	navigator.bluetooth.requestDevice({
	  acceptAllDevices: true
	})
	.then(device => { /* ... */ })
	.catch(error => { console.log(error); });
});
function startUp() {
	//======================================================================
	console.log('here3');
	  
	navigator.bluetooth.getDevices("all"
	     ,function(devices) {
	            console.log('Starting Bluetooth Device get.');
	    		for (var i = 0; i < devices.length; i++) {
	    		    console.log('Found: ' + device[i].name);
	    //		    deviceArray[deviceCount++] = device[i];
	    //			document.querySelector('<option></option>').text(device[i].name).appendTo(btDeviceSelect);
	    //		    updateDeviceName(devices[i]);
	    		}
	      }
	);
	    		
	console.log('here4');
	console.log('here5');
	    
	navigator.bluetoothSocket.onReceive.addListener(onBTReceive);
	navigator.bluetoothSocket.onReceiveError.addListener(onBTReceiveError);
	
};	
/*
document.querySelector('#btConnect').click(function () {
		var btDeviceName    = document.querySelector('#btDeviceSelect').val();
		    deviceOffset    = document.querySelector("#btDeviceSelect")[0].selectedIndex;
		var btDeviceAddress = deviceArray[deviceOffset].address;
		console.log('');
		console.log('Starting Connection to ' + btDeviceName);
		if (!btDeviceName) {
			console.log('No Bluetooth Device Selected.');
			return;
		}
		else if (!socketID) {
			navigator.bluetoothSocket.create(function(createInfo) {
			    if (navigator.runtime.lastError) {
					AddConnectedSocketId(socketID = 0);
					console.log("Socket Create Failed: " + navigator.runtime.lastError.message);
				}
				else {
					socketID = createInfo.socketId;
					navigator.bluetoothSocket.connect(createInfo.socketId,
					    btDeviceAddress, "1101", onConnectedCallback);
				}
			});
			if (navigator.runtime.lastError) {
			    AddConnectedSocketId(socketID = 0);
				console.log("Connection Operation failed: " + navigator.runtime.lastError.message);
			} 
		}
		else {
			console.log('Already connected.');
		}
});
*/
console.log('here7');

//======================================================================
var onConnectedCallback = function() {
		if (navigator.runtime.lastError) {
				AddConnectedSocketId(socketID = 0);
				console.log("Connection failed: " + navigator.runtime.lastError.message);
		}
		else {
				// Profile implementation here.
				console.log("Connected with socketID = " + socketID);
				AddConnectedSocketId(socketID);
				document.querySelector('#socketId').text(socketID);
				document.querySelector('#btStatus').text("Connected");
		}
}
function onBTReceive(info) {
	console.log('Received ' + info.data.byteLength + ' bytes of data: ' + convertArrayBufferToDumpString(info.data));
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
    
/********************************************************************
	var socketID         = 0;
	var deviceArray      = {};
	var device_names     = {};
	var device_Addresses = {};
	var deviceCount      = 0;
	var deviceOffset     = 0;
	var screenWidth = screen.availWidth;
	var screenHeight = screen.availHeight;
	console.log('here1');
	var addDeviceName = function(device) {
		deviceArray[deviceCount++] = device;
    //  var btDeviceName = device.name;
    //  document.querySelector('<option></option>').text(btDeviceName).appendTo(btDeviceSelect);
        document.querySelector('<option></option>').text(device.name).appendTo(btDeviceSelect);
	}devices
	var updateDeviceName = function(device) {
		console.log('  Have a device update - ' + device.name);
	}
	var removeDeviceName = function(device) {
		delete device_names[device.address];
	}
	// Add listeners to receive newly found devices and updates
	// to the previously known devices.
	// no onDeviceAdded ???  navigator.bluetooth.onDeviceAdded.addListener(addDeviceName);
	// no onDeviceAdded ???  navigator.bluetooth.onDeviceChanged.addListener(updateDeviceName);
	// no onDeviceAdded ???  navigator.bluetooth.onDeviceRemoved.addListener(removeDeviceName);	
    // Get the list of paired devices.
    //	console.log("");
    	navigator.bluetooth.getDevices(function(devices) {
    		for (var i = 0; i < devices.length; i++) {
    		    console.log('Found: ' + device[i].name);
    //		    deviceArray[deviceCount++] = device[i];
    //			document.querySelector('<option></option>').text(device[i].name).appendTo(btDeviceSelect);
    //		    updateDeviceName(devices[i]);
    		}
        });
    //======================================================================
	navigator.bluetooth.startDiscovery(function() {
        console.log('Starting Bluetooth Device Scan.');
        setTimeout(function() {  // Stop discovery after 3 seconds
            navigator.bluetooth.stopDiscovery(function() {});
            console.log('Finished Scanning for Bluetooth Devices.');
            document.querySelector('#selectedBTDevice').empty().text(btDeviceSelect.val());
        }, 30000);
    });
	//======================================================================
	function convertArrayBufferToString (buf) {
		return String.fromCharCode.apply(null, new Uint8Array(buf));
	}
    //======================================================================
	function convertArrayBufferToDumpString (buf) {
		var dumpString = '['
		var charArray = new Uint8Array(buf);
		for (var i = 0; i < charArray.length; i++) {
			dumpString += charArray[i].toString();
			if (i < charArray.length - 1) dumpString += ', ';
		}
		dumpString += ']';
		return dumpString;
	}
    //======================================================================
	function convertStringToArrayBuffer (str) {
		var buf = new ArrayBuffer(str.length);
		var bufView = new Uint8Array(buf);
		for (var i = 0; i < str.length; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	}
    //======================================================================
	////function console.log(logmsg) {
	////	var btLog = document.querySelector('#btLog');
	////	var btLogContent = document.querySelector('#btLogContent');
	////	btLogContent.append(document.createTextNode(logmsg + '\n'));
	////	btLog.scrollTop(btLog[0].scrollHeight);
	////}
    //======================================================================
	function printConnectionBTLog(id, msg) {
		console.log('(' + id + ') ' + msg);
	}
    //======================================================================
	document.querySelector('#btDeviceSelect')
		.change(function () {
			document.querySelector('#selectedBTDevice').empty().text(document.querySelector('#btDeviceSelect').val());
		});
    //======================================================================
	document.querySelector('#btConnect')
		.click(function () {
			var btDeviceName    = document.querySelector('#btDeviceSelect').val();
			    deviceOffset    = document.querySelector("#btDeviceSelect")[0].selectedIndex;
			var btDeviceAddress = deviceArray[deviceOffset].address;
			console.log('');
			console.log('Starting Connection to ' + btDeviceName);
			if (!btDeviceName) {
				console.log('No Bluetooth Device Selected.');
				return;
			}
			else if (!socketID) {
				navigator.bluetoothSocket.create(function(createInfo) {
				    if (navigator.runtime.lastError) {
						AddConnectedSocketId(socketID = 0);
						console.log("Socket Create Failed: " + navigator.runtime.lastError.message);
					}
					else {
						socketID = createInfo.socketId;
						navigator.bluetoothSocket.connect(createInfo.socketId,
						    btDeviceAddress, "1101", onConnectedCallback);
					}
				});
				if (navigator.runtime.lastError) {
				    AddConnectedSocketId(socketID = 0);
					console.log("Connection Operation failed: " + navigator.runtime.lastError.message);
				} 
			}
			else {
				console.log('Already connected.');
			}
		});
	//======================================================================
	var onConnectedCallback = function() {
			if (navigator.runtime.lastError) {
					AddConnectedSocketId(socketID = 0);
					console.log("Connection failed: " + navigator.runtime.lastError.message);
			}
			else {
					// Profile implementation here.
					console.log("Connected with socketID = " + socketID);
					AddConnectedSocketId(socketID);
					document.querySelector('#socketId').text(socketID);
					document.querySelector('#btStatus').text("Connected");
			}
	}
    //======================================================================
	document.querySelector('#btDisconnect')
		.click(function () {
			console.log('');
			if (socketID) {
				console.log('Disconnecting connection id ' + socketID + '...');
				navigator.bluetoothSocket.disconnect(socketID);
				if (navigator.runtime.lastError) {
				    console.log("Disconnect failed: " + navigator.runtime.lastError.message);
				}
				else {
					console.log('Disconnect successful');
				    AddConnectedSocketId(0);
					document.querySelector('#socketId').text("-");
					document.querySelector('#btStatus').text("Disconnected");
				}
				socketID = 0;
			}
			else {
				console.log('Not connected.');
			}
		});
    //======================================================================
	document.querySelector('#btGetDevice')
		.click(function () {
		    deviceOffset   = document.querySelector("#btDeviceSelect")[0].selectedIndex;
			var deviceInfo = deviceArray[deviceOffset];
			console.log("");
			console.log(deviceArray[deviceOffset].name + " Has Address " + deviceInfo.address);
			if (deviceInfo.deviceClass) {
				console.log(" Device Class:" + deviceInfo.deviceClass);
			}
			if (deviceInfo.vendorId) {
				console.log(" Vendor ID:" + deviceInfo.vendorId);
			}
			if (deviceInfo.productId) {
				console.log(" Product ID:" + deviceInfo.productId);
			}
			if (deviceInfo.deviceId) {
				console.log(" Device ID:" + deviceInfo.deviceId);
			}
			if (deviceInfo.paired) {
				console.log(" Paired:" + deviceInfo.paired);
			}
			if (deviceInfo.connected) {
				console.log(" Connected:" + deviceInfo.connected);
			}
			for (var i = 0; deviceInfo.uuids.length > i; ++i) {
				console.log(" uuid:" + deviceInfo.uuids[i]);
			}
			if (navigator.runtime.lastError) {
				console.log("getDevice Operation failed: " + navigator.runtime.lastError.message);
			} 
		});
    //======================================================================
	document.querySelector('#btSendMessage')
		.click(function () {
			if (socketID) {
				var txdata = document.querySelector('#sendMessageContent').val();
				console.log('>> Sending message: "' + txdata + '"');
				var txstring = txdata + '\r';
				var txbuffer = convertStringToArrayBuffer(txstring);

				navigator.bluetoothSocket.send(socketID, txbuffer, function (bytes_sent) {
				    if (navigator.runtime.lastError) {
					    console.log("send Operation failed: " + navigator.runtime.lastError.message);
				    } 
					else {
						console.log('Sent ' + bytes_sent + ' bytes');
					}
				});
			}
			else {
				console.log('Not connected.');
			}			
		});
    //======================================================================
	var rxbuilder = '';
	function onBTReceive(info) {
		console.log('Received ' + info.data.byteLength + ' bytes of data: ' + convertArrayBufferToDumpString(info.data));
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
*/