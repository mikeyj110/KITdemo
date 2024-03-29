function scanBarcode() {
    cordova.plugins.barcodeScanner.scan(
        function(result) {
            //alert("We got a barcode\n" +
            //    "Result: " + result.text + "\n" +
            //    "Format: " + result.format + "\n" +
            //    "Cancelled: " + result.cancelled);
            document.getElementById("vin").value = result.text;
        },
        function(error) {
            navigator.notification.alert(
              "Scanning failed: " + error,    // message
              function(){},                   // callback
              'Scanning failed',              // title
              'OK'                            // buttonName
            );
        }, {
            //preferFrontCamera : true, // iOS and Android
            //showFlipCameraButton : true, // iOS and Android
            showTorchButton: true, // iOS and Android
            //torchOn: true, // Android, launch with the torch switched on (if available)
            //saveHistory: true, // Android, save scan history (default false)
            prompt: "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            //formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            //orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
    );
};
function saveResults() {
  var dealer = document.getElementById("dealer").value;
  var vin = document.getElementById("vin").value;
  var kitCode = document.getElementById("kit-code").value;
  var message = "";
  if(!dealer || !vin || !kitCode){
    var message = "Please fill out all data";
    navigator.notification.alert(
      message,          // message
      function(){},     // callback
      'Check Data',  // title
      'OK'              // buttonName
    );
  }
  else {
    console.log(vin + " " + kitCode);
  //  alert("VIN " + vin + " has been added to " + dealer + "using code " + kitCode);
    var message = "VIN " + vin + " has been added to " + dealer + " using code " + kitCode;
    var alertCallback = "Success";
    navigator.notification.alert(
      message,          // message
      function(){},     // callback
      alertCallback,    // title
      'OK'              // buttonName
    );
  }
};

