function getData() {
  var query = '?q={"dealer":{"$elemMatch":{"dealer-name":"' + localStorage.getItem("account") + '"}}}';
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": baseUrl + "kit-codes" + query,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    }
  };

  $.ajax(settings).done(function (response) {
    console.log(baseUrl + "kit-codes" + query);
    if (response.length > 0) {
      console.log(response);
      $.each( response, function( key, value ) {
        document.getElementById("content").innerHTML += "<li>" + "KIT Code: " + value["kit-code"] + " | VIN: " + value.vin + "</li><br>";
        console.log(value.dealer[0]["dealer-name"]);
      });
    } else {
      document.getElementById("content").innerHTML += noResults; 
    };
  });
};

$( window ).on( "load", getData );