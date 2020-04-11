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
    // console.log(baseUrl + "kit-codes" + query);
    if (response.length > 0) {
      // console.log(response);
      $.each( response, function( key, value ) {
        var dealerLink = value.dealer[0]["dealer-link"] + value["kit-code"];
        var onclick = "onclick=\"window.open('" + dealerLink + "', '_system', 'location=yes')\" ";
        // console.log(onclick);
        document.getElementById("content").innerHTML += "<a href='#' "+ onclick + "> <li>" + "KIT Code: " + value["kit-code"] + " | VIN: " + value.vin + "</li></a><br>";
        // console.log(dealerLink);
      });
    } else {
      document.getElementById("content").innerHTML += noResults; 
    };
  });
};

$( window ).on( "load", getData );