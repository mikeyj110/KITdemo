function getData() {
  var query = "";
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": baseUrl + "kit-dealers" + query,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    }
  };

  $.ajax(settings).done(function (response) {
    if (response.length > 0) {
      $.each( response, function( key, value ) {
        document.getElementById("content").innerHTML += "<li>" + value["dealer-name"] + ": " + value["permission-level"] + "</li><br>";
      });
    } else {
      document.getElementById("content").innerHTML += noResults;
    };
  }
);
}


$( window ).on( "load", getData );