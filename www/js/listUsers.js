function getData() {
  var query = "";//"?groupby=permission-level";
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://kitdemo-79bb.restdb.io/rest/kit-dealers" + query,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "5e13ee36b68f0802dd3e606f",
      "cache-control": "no-cache"
    }
  };

  $.ajax(settings).done(function (response) {
    console.log(response["dealer-name"] + "hello")
    if (response.length > 0) {
      $.each( response, function( key, value ) {
        console.log(value["dealer-name"] + ": " + value["permission-level"]);
        document.getElementById("content").innerHTML += "<span>" + value["dealer-name"] + ": " + value["permission-level"] + "</span><br>";
      });

    } else {
    console.log("No results");
    };
  }

);
}


$( window ).on( "load", getData );