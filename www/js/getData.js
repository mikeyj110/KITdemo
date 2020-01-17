function getData() {
  var query = "?groupby=permission-level";
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
    var obj = new db.kitdealers(properties);
    console.log(obj);
    if (response.length > 0) {
      $.each( response, function( key, value ) {
        console.log( key + ": " + value );
      });
    } else {
    console.log("error");
    };
  }

    // $.each(response, function(key, item){
    // console.log(key + ': ' + item);
    // document.getElementById("content").innerHTML += "<span>" + item + "</span><br>";
    // });}
);
}


$( window ).on( "load", getData );